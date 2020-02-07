"use strict";

import { WeatherDailyForecast, WeatherService } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import { ActionContext, Module } from "vuex";
import { RootState } from "@/store/state";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";

const weatherService = container.resolve<WeatherService>(DIToken.WEATHER_SERVICE);

export interface DailyForecastsModuleState {
    days: Nullable<WeatherDailyForecast[]>;
}

export enum DailyForecastsModuleAction {
    GET_FORECAST = "GetDailyForecasts"
}

export const dailyForecastsModule: Module<DailyForecastsModuleState, RootState> = {
    state: {
        days: null
    },
    mutations: {
        updateHourlyWeatherForecast(
            state: DailyForecastsModuleState,
            weatherDailyForecast: Nullable<WeatherDailyForecast[]>
        ) {
            state.days = weatherDailyForecast;
        }
    },
    actions: {
        [DailyForecastsModuleAction.GET_FORECAST]: async (
            { commit }: ActionContext<DailyForecastsModuleState, RootState>,
            coordinates: Nullable<UserCoordinates>
        ) => {
            if (!coordinates) {
                return;
            }

            const weatherForecast = await weatherService.getDailyForecastsByCoordinates(coordinates);

            commit("updateHourlyWeatherForecast", weatherForecast);
        }
    }
};