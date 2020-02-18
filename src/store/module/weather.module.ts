"use strict";

import { ActionContext, Module } from "vuex";
import {
    CurrentWeatherOverview,
    TemperatureUnit,
    WeatherDailyForecast,
    WeatherService
} from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import { RootState } from "@/store/state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { LocationCoordinates } from "@/business/geolocation/GeolocationService";

export interface WeatherModuleState {
    current: Nullable<CurrentWeatherOverview>;
    days: Nullable<WeatherDailyForecast[]>;
}

export interface WeatherModuleRequest {
    coordinates: Nullable<LocationCoordinates>;
    unit: TemperatureUnit;
}

const weatherService = container.resolve<WeatherService>(DIToken.WEATHER_SERVICE);

export enum WeatherModuleAction {
    GET_CURRENT_WEATHER = "GetCurrentWeatherOverviewByCoordinates",
    GET_FORECAST = "GetDailyForecasts"
}

export enum WeatherModuleMutation {
    UPDATE_OVERVIEW = "UpdateCurrentWeatherOverview",
    UPDATE_FORECAST = "UpdateForecast"
}

export const weatherModule: Module<WeatherModuleState, RootState> = {
    state: {
        current: null,
        days: null
    },
    mutations: {
        [WeatherModuleMutation.UPDATE_OVERVIEW]: (
            state: WeatherModuleState,
            currentWeatherOverview: Nullable<CurrentWeatherOverview>
        ) => {
            state.current = currentWeatherOverview;
        },
        [WeatherModuleMutation.UPDATE_FORECAST]: (
            state: WeatherModuleState,
            weatherDailyForecast: Nullable<WeatherDailyForecast[]>
        ) => {
            state.days = weatherDailyForecast;
        }
    },
    actions: {
        [WeatherModuleAction.GET_CURRENT_WEATHER]: async (
            { commit }: ActionContext<WeatherModuleState, RootState>,
            { coordinates, unit }: WeatherModuleRequest
        ) => {
            if (!coordinates) {
                return;
            }

            const weatherOverview = await weatherService.getCurrentWeather({ coordinates, unit });

            commit(WeatherModuleMutation.UPDATE_OVERVIEW, weatherOverview);
        },
        [WeatherModuleAction.GET_FORECAST]: async (
            { commit }: ActionContext<WeatherModuleState, RootState>,
            { coordinates, unit }: WeatherModuleRequest
        ) => {
            if (!coordinates) {
                return;
            }

            const weatherForecast = await weatherService.getDailyForecasts({ coordinates, unit });

            commit(WeatherModuleMutation.UPDATE_FORECAST, weatherForecast);
        }
    }
};
