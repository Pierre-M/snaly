"use strict";

import { Nullable } from "@/types/app";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import {
    CurrentWeatherOverview,
    WeatherForecastEntry
} from "@/business/weather/WeatherService";

export interface RootState {
    hourlyWeatherForecast: Nullable<WeatherForecastEntry[]>;
}

export const state: RootState = {
    hourlyWeatherForecast: null
};
