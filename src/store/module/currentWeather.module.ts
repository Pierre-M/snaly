"use strict";

import { ActionContext, Module } from "vuex";
import { CurrentWeatherOverview, WeatherService } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import { RootState } from "@/store/state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { WeatherModuleRequest } from "@/store/module/dailyForecasts.module";

export interface CurrentWeatherModuleState {
    overview: Nullable<CurrentWeatherOverview>;
}

const weatherService = container.resolve<WeatherService>(DIToken.WEATHER_SERVICE);

export enum CurrentWeatherModuleAction {
    GET_CURRENT_WEATHER = "GetCurrentWeatherOverviewByCoordinates"
}

export enum CurrentWeatherModuleMutation {
    UPDATE_OVERVIEW = "UpdateCurrentWeatherOverview"
}

export const currentWeatherModule: Module<CurrentWeatherModuleState, RootState> = {
    state: {
        overview: null
    },
    mutations: {
        [CurrentWeatherModuleMutation.UPDATE_OVERVIEW]: (
            state: CurrentWeatherModuleState,
            currentWeatherOverview: Nullable<CurrentWeatherOverview>
        ) => {
            state.overview = currentWeatherOverview;
        }
    },
    actions: {
        [CurrentWeatherModuleAction.GET_CURRENT_WEATHER]: async (
            { commit }: ActionContext<CurrentWeatherModuleState, RootState>,
            { coordinates, unit }: WeatherModuleRequest
        ) => {
            if (!coordinates) {
                return;
            }

            const weatherOverview = await weatherService.getCurrentWeather({ coordinates, unit });

            commit(CurrentWeatherModuleMutation.UPDATE_OVERVIEW, weatherOverview);
        }
    }
};
