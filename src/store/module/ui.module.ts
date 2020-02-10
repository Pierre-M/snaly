"use strict";

import Vue from "vue";
import { RootState } from "@/store/state";
import { ActionContext, Module } from "vuex";
import DesktopLayout from "@/ui/layout/DesktopLayout.vue";
import { WeatherDailyForecast } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import { ShareRequest, SharingService } from "@/core/browser/SharingService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { I18nService } from "@/ui/core/vue-plugins/I18nPlugin";

const sharingService = container.resolve<SharingService>(DIToken.SHARING_SERVICE);

export interface UIModuleState {
    layout: typeof Vue;
    openedForecast: Nullable<WeatherDailyForecast>;
    canShare: boolean;
}

export enum UIModuleMutations {
    UPDATE_OPENED_DAILY_FORECAST = "updateOpenedDailyForecast"
}

export enum UIModuleActions {
    TOGGLE_DAILY_FORECAST = "toggleDailyForecast",
    SHARE = "shareSnaly"
}

export enum UIModuleGetter {
    OPENED_FORECAST = "openedForecast",
    LAYOUT = "layout"
}

export const uiModule: Module<UIModuleState, RootState> = {
    state: {
        layout: DesktopLayout,
        openedForecast: null,
        canShare: sharingService.canShare
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
        },
        [UIModuleActions.SHARE]: () => {
            const shareRequest: ShareRequest = {
                url: window.location.origin,
                title: I18nService.$t("share.title") as string,
                text: I18nService.$t("share.description") as string
            };

            sharingService.share(shareRequest);
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
