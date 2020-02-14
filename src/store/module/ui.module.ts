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
import { ShortcutService } from "@/core/browser/ShorcutService";

const sharingService = container.resolve<SharingService>(DIToken.SHARING_SERVICE);
const shortcutService = container.resolve<ShortcutService>(DIToken.SHORTCUT_SERVICE);

export interface UIModuleState {
    layout: typeof Vue;
    openedForecast: Nullable<WeatherDailyForecast>;
    canShare: boolean;
    citySearchIsOpened: boolean;
}

export enum UIModuleMutations {
    UPDATE_OPENED_DAILY_FORECAST = "updateOpenedDailyForecast",
    UPDATE_CITY_SEARCH_OPEN_STATE = "updateCitySearchOpenState"
}

export enum UIModuleActions {
    TOGGLE_DAILY_FORECAST = "toggleDailyForecast",
    OPEN_CITY_SEARCH = "openCitySearch",
    CLOSE_CITY_SEARCH = "closeCitySearch",
    SHARE = "shareSnaly"
}

export enum UIModuleGetter {
    OPENED_FORECAST = "openedForecast",
    LAYOUT = "layout",
    IS_CITY_SEARCH_OPENED = "isCitySearchOpened"
}

export const uiModule: Module<UIModuleState, RootState> = {
    state: {
        layout: DesktopLayout,
        openedForecast: null,
        canShare: sharingService.canShare,
        citySearchIsOpened: false
    },
    mutations: {
        [UIModuleMutations.UPDATE_OPENED_DAILY_FORECAST]: (
            state: UIModuleState,
            forecast: Nullable<WeatherDailyForecast>
        ) => {
            state.openedForecast = forecast;
        },
        [UIModuleMutations.UPDATE_CITY_SEARCH_OPEN_STATE]: (state: UIModuleState, isOpened: boolean) => {
            state.citySearchIsOpened = isOpened;
        }
    },
    actions: {
        [UIModuleActions.TOGGLE_DAILY_FORECAST]: (
            { commit }: ActionContext<UIModuleState, RootState>,
            forecast?: Nullable<WeatherDailyForecast>
        ) => {
            commit(UIModuleMutations.UPDATE_OPENED_DAILY_FORECAST, forecast || null);
        },
        [UIModuleActions.OPEN_CITY_SEARCH]: ({ commit }: ActionContext<UIModuleState, RootState>) => {
            commit(UIModuleMutations.UPDATE_CITY_SEARCH_OPEN_STATE, true);
        },
        [UIModuleActions.CLOSE_CITY_SEARCH]: ({ commit }: ActionContext<UIModuleState, RootState>) => {
            commit(UIModuleMutations.UPDATE_CITY_SEARCH_OPEN_STATE, false);
        },
        [UIModuleActions.SHARE]: () => {
            const shareRequest: ShareRequest = {
                url: window.location.origin,
                title: I18nService.$t("share.title") as string,
                text: I18nService.$t("share.description") as string
            };

            sharingService.share(shareRequest);
        },
        init({ dispatch }) {
            shortcutService.register({
                def: { key: "Escape" },
                enabledOnInput: true,
                action: () => dispatch(UIModuleActions.CLOSE_CITY_SEARCH)
            });

            shortcutService.register({
                def: { key: "s" },
                action: () => dispatch(UIModuleActions.OPEN_CITY_SEARCH)
            });
        }
    },
    getters: {
        [UIModuleGetter.OPENED_FORECAST]: (state: UIModuleState): Nullable<WeatherDailyForecast> => {
            return state.openedForecast;
        },
        [UIModuleGetter.LAYOUT]: (state: UIModuleState): typeof Vue => {
            return state.layout;
        },
        [UIModuleGetter.IS_CITY_SEARCH_OPENED]: (state: UIModuleState): boolean => {
            return state.citySearchIsOpened;
        }
    }
};
