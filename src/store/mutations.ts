"use strict";

import { MutationTree } from "vuex";
import { AppState } from "@/store/state";
import { Nullable } from "@/types/app";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import {
    CurrentWeatherOverview,
    WeatherForecastEntry
} from "@/business/weather/WeatherService";
import { ContextualImage } from "@/core/image/ContextualImageService";

export const mutations: MutationTree<AppState> = {
    updateCoordinates(state: AppState, coordinates: Nullable<UserCoordinates>) {
        state.coordinates = coordinates;
    },
    updateCurrentWeatherOverview(
        state: AppState,
        currentWeatherOverview: Nullable<CurrentWeatherOverview>
    ) {
        state.currentWeatherOverview = currentWeatherOverview;
    },
    updateHourlyWeatherForecast(
        state: AppState,
        weatherForecast: Nullable<WeatherForecastEntry[]>
    ) {
        state.hourlyWeatherForecast = weatherForecast;
    },
    updateWallpaper(state: AppState, wallpaper: Nullable<ContextualImage>) {
        state.wallpaper = wallpaper;
    }
};
