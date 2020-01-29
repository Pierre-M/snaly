"use strict";

import {
    WeatherForecastEntry,
    WeatherService
} from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import { ActionContext, Module } from "vuex";
import { RootState } from "@/store/state";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";

const weatherService = container.resolve<WeatherService>(
    DIToken.WEATHER_SERVICE
);

export interface HourlyForecastModuleState {
    forecast: Nullable<WeatherForecastEntry[]>;
}

export enum HourlyForecastModuleAction {
    GET_FORECAST = "GetHourlyForecastByCoordinates"
}

export const hourlyForecastModule: Module<
    HourlyForecastModuleState,
    RootState
> = {
    state: {
        forecast: null
    },
    mutations: {
        updateHourlyWeatherForecast(
            state: HourlyForecastModuleState,
            weatherForecast: Nullable<WeatherForecastEntry[]>
        ) {
            state.forecast = weatherForecast;
        }
    },
    actions: {
        [HourlyForecastModuleAction.GET_FORECAST]: async (
            { commit }: ActionContext<HourlyForecastModuleState, RootState>,
            coordinates: Nullable<UserCoordinates>
        ) => {
            if (!coordinates) {
                return;
            }

            const weatherForecast = await weatherService.getHourlyForecastByCoordinates(
                coordinates
            );

            commit("updateHourlyWeatherForecast", weatherForecast);
        }
    }
};
