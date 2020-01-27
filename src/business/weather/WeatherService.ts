"use strict";

import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export enum TemperatureUnit {
    CELSIUS = "celsius",
    FAHRENHEIT = "fahrenheit"
}

export interface TemperatureOverview {
    current: number;
    felt: number;
    min: number;
    max: number;
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

export interface WeatherService {
    getCurrentWeatherByCoordinates(
        coordinates: UserCoordinates
    ): Promise<Nullable<CurrentWeatherOverview>>;

    getHourlyForecastByCoordinates(
        coordinates: UserCoordinates
    ): Promise<Nullable<WeatherForecastEntry[]>>;
}
