import { LocationCoordinates } from "@/location/models/location.model";

export enum TemperatureUnit {
  CELSIUS = "metric",
  FAHRENHEIT = "imperial",
}

export type WeatherIcon =
  | "day-sunny"
  | "night-clear"
  | "day-cloudy"
  | "night-alt-cloudy"
  | "cloud"
  | "cloudy"
  | "showers"
  | "day-rain"
  | "night-alt-rain"
  | "day-lightning"
  | "night-alt-lightning"
  | "day-snow"
  | "night-alt-snow"
  | "fog";

export interface TemperatureOverview {
  current: number;
  felt: number;
  min: number;
  max: number;
  unit: TemperatureUnit;
}

export interface TemperatureRange {
  min: number;
  max: number;
  average: number;
  unit: TemperatureUnit;
}

export interface WeatherDescription {
  icon: WeatherIcon;
  text: string;
}

export interface SunCycle {
  sunrise: Date;
  sunset: Date;
}

export interface WeatherOverview {
  temperatureOverview: TemperatureOverview;
  description: WeatherDescription;
  sunCycle?: SunCycle;
}

export interface WeatherForecastEntry {
  overview: WeatherOverview;
  date: Date;
}

export interface WeatherDailyForecast {
  date: Date;
  temperatureRange: TemperatureRange;
  description: WeatherDescription;
  forecast: WeatherForecastEntry[];
}

export interface WeatherServiceRequest {
  coordinates: LocationCoordinates;
  unit: TemperatureUnit;
}

export interface WeatherService {
  getCurrent(request: WeatherServiceRequest): Promise<WeatherOverview | null>;
  getDailyForecasts(
    request: WeatherServiceRequest
  ): Promise<WeatherDailyForecast[]>;
}

export const WeatherServiceToken = Symbol();
