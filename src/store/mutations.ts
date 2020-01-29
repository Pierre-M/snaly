"use strict";

import { MutationTree } from "vuex";
import { RootState } from "@/store/state";
import { Nullable } from "@/types/app";
import { WeatherForecastEntry } from "@/business/weather/WeatherService";

export const mutations: MutationTree<RootState> = {
    updateHourlyWeatherForecast(
        state: RootState,
        weatherForecast: Nullable<WeatherForecastEntry[]>
    ) {
        state.hourlyWeatherForecast = weatherForecast;
    }
};
