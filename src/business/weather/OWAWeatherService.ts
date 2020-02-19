"use strict";

import { Nullable } from "@/types/app";
import {
    WeatherDailyForecast,
    WeatherDailyForecastsBuilder,
    WeatherOverview,
    WeatherOverviewBuilder,
    WeatherService,
    WeatherServiceRequest
} from "@/business/weather/WeatherService";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";

export const OPEN_WEATHER_API = "https://api.openweathermap.org/data/2.5";
export const OPEN_WEATHER_CURRENT_API = `${OPEN_WEATHER_API}/weather`;
export const OPEN_WEATHER_FORECASTS_API = `${OPEN_WEATHER_API}/forecast`;
export const OPEN_WEATHER_API_KEY = "ec02d5d2df7e4f5a7164cbf5e7580a73";

@injectable()
@singleton()
export class OWAWeatherService implements WeatherService {
    private BASE_API_PARAMS = {
        APPID: OPEN_WEATHER_API_KEY
    };

    constructor(
        @inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient,
        @inject(DIToken.WEATHER_OVERVIEW_BUILDER) private weatherOverviewBuilder: WeatherOverviewBuilder,
        @inject(DIToken.WEATHER_FORECASTS_BUILDER) private weatherForecastsBuilder: WeatherDailyForecastsBuilder
    ) {}

    async getCurrentWeather({ coordinates, unit }: WeatherServiceRequest): Promise<Nullable<WeatherOverview>> {
        const [res] = await this.httpClient.get<any>(OPEN_WEATHER_CURRENT_API, {
            ...this.BASE_API_PARAMS,
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            units: unit
        });

        if (!res) {
            return null;
        }

        return this.weatherOverviewBuilder.build(res, { unit });
    }

    async getDailyForecasts({ coordinates, unit }: WeatherServiceRequest): Promise<Nullable<WeatherDailyForecast[]>> {
        const [res] = await this.httpClient.get<any>(OPEN_WEATHER_FORECASTS_API, {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            units: unit,
            ...this.BASE_API_PARAMS
        });

        if (!res) {
            return null;
        }

        return this.weatherForecastsBuilder.build(res.list, { unit });
    }
}
