"use strict";

import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export enum TemperatureUnit {
    CELSIUS = "metric",
    FAHRENHEIT = "imperial"
}

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
    icon: Nullable<string>;
    text: string;
}

export interface SunCycle {
    sunrise: Date;
    sunset: Date;
}

export interface WeatherOverview {
    temperatureOverview: TemperatureOverview;
    description: WeatherDescription;
}

export interface CurrentWeatherOverview extends WeatherOverview {
    suncycle: SunCycle;
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
    coordinates: UserCoordinates;
    unit: TemperatureUnit;
}

export interface WeatherService {
    getCurrentWeather(params: WeatherServiceRequest): Promise<Nullable<CurrentWeatherOverview>>;
    getDailyForecasts(params: WeatherServiceRequest): Promise<Nullable<WeatherDailyForecast[]>>;
}
