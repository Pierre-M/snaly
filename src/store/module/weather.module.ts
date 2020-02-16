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
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Shortcut } from "@/core/browser/ShorcutService";
import { UIModuleActions } from "@/store/module/ui.module";
import { I18nService } from "@/core/i18n/I18nService";

const i18nService = container.resolve<I18nService>(DIToken.I18N_SERVICE);

export interface WeatherModuleState {
    current: Nullable<CurrentWeatherOverview>;
    days: Nullable<WeatherDailyForecast[]>;
}

export interface WeatherModuleRequest {
    coordinates: Nullable<UserCoordinates>;
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
        },
        init({ dispatch, state }) {
            [...Array(6).keys()].map(idx => {
                const shortcut: Shortcut = {
                    def: {
                        key: `${idx + 1}`
                    },
                    action(): void {
                        const day = state.days ? state.days[idx] : null;

                        if (!day) return;

                        dispatch(UIModuleActions.TOGGLE_DAILY_FORECAST, day);
                    },
                    description: i18nService.t("shortcuts.openForecast", idx)
                };

                dispatch(UIModuleActions.REGISTER_SHORTCUT, shortcut);
            });
        }
    }
};
