"use strict";

import { MutationTree } from "vuex";
import { RootState } from "@/store/state";
import { Nullable } from "@/types/app";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import {
    CurrentWeatherOverview,
    WeatherForecastEntry
} from "@/business/weather/WeatherService";

export const mutations: MutationTree<RootState> = {
    updateCoordinates(
        state: RootState,
        coordinates: Nullable<UserCoordinates>
    ) {
        state.coordinates = coordinates;
    },
    updateCurrentWeatherOverview(
        state: RootState,
        currentWeatherOverview: Nullable<CurrentWeatherOverview>
    ) {
        state.currentWeatherOverview = currentWeatherOverview;
    },
    updateHourlyWeatherForecast(
        state: RootState,
        weatherForecast: Nullable<WeatherForecastEntry[]>
    ) {
        state.hourlyWeatherForecast = weatherForecast;
    }
};
