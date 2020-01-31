"use strict";

import { ActionContext, Module } from "vuex";
import { CurrentWeatherOverview, WeatherService } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import { RootState } from "@/store/state";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";

export interface CurrentWeatherModuleState {
    overview: Nullable<CurrentWeatherOverview>;
}

const weatherService = container.resolve<WeatherService>(DIToken.WEATHER_SERVICE);

export enum CurrentWeatherModuleAction {
    GET_BY_COORDINATE = "GetCurrentWeatherOverviewByCoordinates"
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
        [CurrentWeatherModuleAction.GET_BY_COORDINATE]: async (
            { commit }: ActionContext<CurrentWeatherModuleState, RootState>,
            coordinates: Nullable<UserCoordinates>
        ) => {
            if (!coordinates) {
                return;
            }

            const weatherOverview = await weatherService.getCurrentWeatherByCoordinates(coordinates);

            commit(CurrentWeatherModuleMutation.UPDATE_OVERVIEW, weatherOverview);
        }
    }
};
