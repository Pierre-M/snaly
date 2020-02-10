"use strict";

import Vue from "vue";
import { RootState } from "@/store/state";
import { ActionContext, Module } from "vuex";
import DesktopLayout from "@/ui/layout/DesktopLayout.vue";
import { WeatherDailyForecast } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";

export interface UIModuleState {
    layout: typeof Vue;
    openedForecast: Nullable<WeatherDailyForecast>;
}

export enum UIModuleMutations {
    UPDATE_OPENED_DAILY_FORECAST = "updateOpenedDailyForecast"
}

export enum UIModuleActions {
    TOGGLE_DAILY_FORECAST = "toggleDailyForecast"
}

export enum UIModuleGetter {
    OPENED_FORECAST = "openedForecast",
    LAYOUT = "layout"
}

export const uiModule: Module<UIModuleState, RootState> = {
    state: {
        layout: DesktopLayout,
        openedForecast: null
    },
    mutations: {
        [UIModuleMutations.UPDATE_OPENED_DAILY_FORECAST]: (
            state: UIModuleState,
            forecast: Nullable<WeatherDailyForecast>
        ) => {
            state.openedForecast = forecast;
        }
    },
    actions: {
        [UIModuleActions.TOGGLE_DAILY_FORECAST]: (
            { commit }: ActionContext<UIModuleState, RootState>,
            forecast?: Nullable<WeatherDailyForecast>
        ) => {
            commit(UIModuleMutations.UPDATE_OPENED_DAILY_FORECAST, forecast || null);
        }
    },
    getters: {
        [UIModuleGetter.OPENED_FORECAST]: (state: UIModuleState): Nullable<WeatherDailyForecast> => {
            return state.openedForecast;
        },
        [UIModuleGetter.LAYOUT]: (state: UIModuleState): typeof Vue => {
            return state.layout;
        }
    }
};
