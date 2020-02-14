"use strict";

import { RootState } from "@/store/state";
import { ActionContext, Module } from "vuex";
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
    openedForecast: Nullable<WeatherDailyForecast>;
    canShare: boolean;
    citySearchIsOpened: boolean;
    sideNavIsOpened: boolean;
}

export enum UIModuleMutations {
    UPDATE_OPENED_DAILY_FORECAST = "updateOpenedDailyForecast",
    UPDATE_CITY_SEARCH_OPEN_STATE = "updateCitySearchOpenState",
    UPDATE_SIDE_NAV_OPEN_STATE = "updateSideNavOpenState"
}

export enum UIModuleActions {
    TOGGLE_DAILY_FORECAST = "toggleDailyForecast",
    OPEN_CITY_SEARCH = "openCitySearch",
    CLOSE_CITY_SEARCH = "closeCitySearch",
    OPEN_SIDE_NAV = "openSideNav",
    CLOSE_SIDE_NAV = "closeSideNav",
    TOGGLE_SIDE_NAV = "toggleSideNav",
    SHARE = "shareSnaly"
}

export enum UIModuleGetter {
    OPENED_FORECAST = "openedForecast",
    IS_CITY_SEARCH_OPENED = "isCitySearchOpened",
    IS_SIDE_NAV_OPENED = "isSideNavOpened"
}

export const uiModule: Module<UIModuleState, RootState> = {
    state: {
        openedForecast: null,
        canShare: sharingService.canShare,
        citySearchIsOpened: false,
        sideNavIsOpened: false
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
        },
        [UIModuleMutations.UPDATE_SIDE_NAV_OPEN_STATE]: (state: UIModuleState, isOpened: boolean) => {
            state.sideNavIsOpened = isOpened;
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
        [UIModuleActions.OPEN_SIDE_NAV]: ({ commit }: ActionContext<UIModuleState, RootState>) => {
            commit(UIModuleMutations.UPDATE_SIDE_NAV_OPEN_STATE, true);
        },
        [UIModuleActions.CLOSE_SIDE_NAV]: ({ commit }: ActionContext<UIModuleState, RootState>) => {
            commit(UIModuleMutations.UPDATE_SIDE_NAV_OPEN_STATE, false);
        },
        [UIModuleActions.CLOSE_SIDE_NAV]: ({ commit }: ActionContext<UIModuleState, RootState>) => {
            commit(UIModuleMutations.UPDATE_SIDE_NAV_OPEN_STATE, false);
        },
        [UIModuleActions.TOGGLE_SIDE_NAV]: ({ commit, state }: ActionContext<UIModuleState, RootState>) => {
            commit(UIModuleMutations.UPDATE_SIDE_NAV_OPEN_STATE, !state.sideNavIsOpened);
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

            shortcutService.register({
                def: { key: "m" },
                action: () => dispatch(UIModuleActions.TOGGLE_SIDE_NAV)
            });

            shortcutService.register({
                def: { key: "Escape" },
                action: () => dispatch(UIModuleActions.CLOSE_SIDE_NAV)
            });
        }
    },
    getters: {
        [UIModuleGetter.OPENED_FORECAST]: (state: UIModuleState): Nullable<WeatherDailyForecast> => {
            return state.openedForecast;
        },
        [UIModuleGetter.IS_CITY_SEARCH_OPENED]: (state: UIModuleState): boolean => {
            return state.citySearchIsOpened;
        },
        [UIModuleGetter.IS_SIDE_NAV_OPENED]: (state: UIModuleState): boolean => {
            return state.sideNavIsOpened;
        }
    }
};
