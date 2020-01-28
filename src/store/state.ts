"use strict";

import { Nullable } from "@/types/app";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import {
    CurrentWeatherOverview,
    WeatherForecastEntry
} from "@/business/weather/WeatherService";

export interface RootState {
    coordinates: Nullable<UserCoordinates>;
    currentWeatherOverview: Nullable<CurrentWeatherOverview>;
    hourlyWeatherForecast: Nullable<WeatherForecastEntry[]>;
}

export const state: RootState = {
    coordinates: null,
    currentWeatherOverview: null,
    hourlyWeatherForecast: null
};
