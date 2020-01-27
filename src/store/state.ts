"use strict";

import { Nullable } from "@/types/app";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import {
    CurrentWeatherOverview,
    WeatherForecastEntry
} from "@/business/weather/WeatherService";
import { ContextualImage } from "@/core/image/ContextualImageService";

export interface AppState {
    coordinates: Nullable<UserCoordinates>;
    currentWeatherOverview: Nullable<CurrentWeatherOverview>;
    hourlyWeatherForecast: Nullable<WeatherForecastEntry[]>;
    wallpaper: Nullable<ContextualImage>;
}

export const state: AppState = {
    coordinates: null,
    currentWeatherOverview: null,
    hourlyWeatherForecast: null,
    wallpaper: null
};
