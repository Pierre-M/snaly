"use strict";

import { LocationCoordinates } from "@/business/geolocation/GeolocationService";
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
    suncycle?: SunCycle;
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
    coordinates: LocationCoordinates;
    unit: TemperatureUnit;
}

export interface WeatherBuilderParams {
    unit: TemperatureUnit;
}

export interface WeatherDailyForecastsBuilder {
    build(data: any[], params: WeatherBuilderParams): WeatherDailyForecast[];
}

export interface WeatherOverviewBuilder {
    build(data: any, params: WeatherBuilderParams): Nullable<WeatherOverview>;
}

export interface WeatherService {
    getCurrentWeather(params: WeatherServiceRequest): Promise<Nullable<WeatherOverview>>;
    getDailyForecasts(params: WeatherServiceRequest): Promise<Nullable<WeatherDailyForecast[]>>;
}
