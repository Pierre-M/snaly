import {
  PrecipitationEntry,
  TemperatureUnit,
  WeatherDailyForecast,
  WeatherDescription,
  WeatherForecastEntry,
  WeatherIcon,
  WeatherOverview,
  WeatherService,
  WeatherServiceRequest,
} from "../models/weather.model";
import HttpClient, { ApiResponse } from "@/core/http/HttpClient";
import { groupBy, chain, last } from "lodash";
import { iconNameMap } from "@/weather/services/OWAIconNameMap";

export class OWAWeatherService implements WeatherService {
  constructor(private apiKey: string, private httpClient: HttpClient) {}

  private static OWBaseApi = "https://api.openweathermap.org/data/2.5";
  private static OWCurrentApi = `${OWAWeatherService.OWBaseApi}/weather`;
  private static OWAForecastsApi = `${OWAWeatherService.OWBaseApi}/forecast`;
  private static OWAPrecipitationApi = `${OWAWeatherService.OWBaseApi}/onecall`;
  private baseApiParams = {
    appid: this.apiKey,
  };

  async getDailyForecasts({
    coordinates,
    unit,
  }: WeatherServiceRequest): Promise<WeatherDailyForecast[]> {
    try {
      const { data } = await this.httpClient.get(
        OWAWeatherService.OWAForecastsApi,
        {
          ...this.baseApiParams,
          lat: coordinates.lat,
          lon: coordinates.lng,
          units: unit,
        }
      );

      return this.toDailyForecasts(data.list, { coordinates, unit });
    } catch {
      return [];
    }
  }

  async getCurrent({
    coordinates,
    unit,
  }: WeatherServiceRequest): Promise<WeatherOverview | null> {
    try {
      const { data } = await this.httpClient.get(
        OWAWeatherService.OWCurrentApi,
        {
          ...this.baseApiParams,
          lat: coordinates.lat,
          lon: coordinates.lng,
          units: unit,
        }
      );

      return OWAWeatherService.toWeatherOverview(data, unit);
    } catch {
      return null;
    }
  }

  async getPrecipitationInNextHour({
    coordinates,
    unit,
  }: WeatherServiceRequest): Promise<PrecipitationEntry[]> {
    try {
      const { data } = await this.httpClient.get(
        OWAWeatherService.OWAPrecipitationApi,
        {
          ...this.baseApiParams,
          lat: coordinates.lat,
          lon: coordinates.lng,
          units: unit,
          exclude: "hourly,daily,current",
        }
      );

      return OWAWeatherService.toPrecipitationEntries(data);
    } catch {
      return [];
    }
  }

  private static toPrecipitationEntries(
    response: ApiResponse
  ): PrecipitationEntry[] {
    return response.minutely.map((entry: ApiResponse) => {
      return {
        date: new Date(entry.dt * 1000),
        volume: entry.volume,
      };
    });
  }

  private static toWeatherOverview(
    apiResponse: ApiResponse,
    unit: TemperatureUnit
  ): WeatherOverview {
    return {
      temperatureOverview: {
        current: apiResponse.main.temp,
        min: apiResponse.main.temp_min,
        max: apiResponse.main.temp_max,
        felt: apiResponse.main.feels_like,
        unit,
      },
      description: {
        text: apiResponse.weather[0].main,
        icon: OWAWeatherService.toWeatherIcon(apiResponse.weather[0].icon),
      },
      ...(apiResponse.sys && apiResponse.sys.sunrise
        ? {
            sunCycle: {
              sunrise: new Date(apiResponse.sys.sunrise * 1000),
              sunset: new Date(apiResponse.sys.sunset * 1000),
            },
          }
        : {}),
    };
  }

  private toDailyForecasts(
    response: ApiResponse[],
    params: WeatherServiceRequest
  ): WeatherDailyForecast[] {
    const forecastsByDate = this.groupForecastsByDate(response);

    return Object.keys(forecastsByDate).reduce(
      (forecasts: WeatherDailyForecast[], date: string) => {
        const current = forecastsByDate[date];
        const forecast = this.buildForecastEntries(current, params);

        try {
          return [
            ...forecasts,
            {
              date: new Date(parseInt(date, 10)),
              temperatureRange: {
                average: OWAWeatherService.computeAverageTemperature(current),
                min: OWAWeatherService.getMinTemperature(current),
                max: OWAWeatherService.getMaxTemperature(current),
                unit: params.unit,
              },
              description: OWAWeatherService.computeAverageDescription(current),
              forecast,
            },
          ];
        } catch (err) {
          console.log(err);
          return forecasts;
        }
      },
      []
    );
  }

  private groupForecastsByDate(
    response: ApiResponse[]
  ): Record<string, ApiResponse[]> {
    return groupBy(response, (d: ApiResponse) => {
      const date = new Date(d.dt * 1000);
      const timeOffsetInMinutes = date.getTimezoneOffset();

      return date.setHours(0, -timeOffsetInMinutes, 0, 0);
    });
  }

  private static computeAverageTemperature(forecasts: ApiResponse[]): number {
    return (
      forecasts.reduce((acc, curr) => acc + curr.main.temp, 0) /
      forecasts.length
    );
  }

  private static getMinTemperature(forecasts: ApiResponse[]): number {
    return Math.min(...forecasts.map((c) => c.main.temp_min));
  }

  private static getMaxTemperature(forecasts: ApiResponse[]): number {
    return Math.max(...forecasts.map((c) => c.main.temp_max));
  }

  private static computeAverageDescription(
    forecasts: ApiResponse[]
  ): WeatherDescription {
    const text = OWAWeatherService.getMostRepresentedElement(
      forecasts.map((f) => f.weather[0].description)
    );
    const icon = OWAWeatherService.getMostRepresentedElement(
      forecasts.map((f) => f.weather[0].icon)
    );

    return {
      text,
      icon: OWAWeatherService.toWeatherIcon(icon),
    };
  }

  private static getMostRepresentedElement(elements: string[]): string {
    return chain(elements)
      .countBy()
      .toPairs()
      .maxBy(last)
      .head()
      .value() as string;
  }

  private buildForecastEntries(
    entries: ApiResponse[],
    params: WeatherServiceRequest
  ): WeatherForecastEntry[] {
    return entries.reduce(
      (forecast: WeatherForecastEntry[], current: ApiResponse) => {
        const overview = OWAWeatherService.toWeatherOverview(
          current,
          params.unit
        );

        if (!overview) return forecast;

        return [
          ...forecast,
          {
            date: new Date(current.dt * 1000),
            overview,
          },
        ];
      },
      []
    );
  }

  private static toWeatherIcon(icon: string): WeatherIcon {
    return iconNameMap[icon];
  }
}
