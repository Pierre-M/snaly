"use strict";

import { RootState } from "@/store/state";
import { ActionContext, Module } from "vuex";
import { WeatherDailyForecast } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import { ShareRequest, SharingService } from "@/core/browser/SharingService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { Shortcut, ShortcutResume, ShortcutService } from "@/core/browser/ShorcutService";
import { I18nService } from "@/core/i18n/I18nService";
import { ScreenInspector } from "@/core/browser/ScreenInspector";

const sharingService = container.resolve<SharingService>(DIToken.SHARING_SERVICE);
const shortcutService = container.resolve<ShortcutService>(DIToken.SHORTCUT_SERVICE);
const i18nService = container.resolve<I18nService>(DIToken.I18N_SERVICE);
const screenInspectorService = container.resolve<ScreenInspector>(DIToken.SCREEN_INSPECTOR);

export const CITY_SEARCH_WIDGET_ID = "citySearchPanel";
export const NAV_WIDGET_ID = "navWidget";

export interface UIModuleState {
    openedForecast: Nullable<WeatherDailyForecast>;
    canShare: boolean;
    openedPanel: Nullable<string>;
    shortcuts: ShortcutResume[];
    screen: ScreenInspector;
}

export enum UIModuleMutations {
    UPDATE_OPENED_DAILY_FORECAST = "updateOpenedDailyForecast",
    UPDATE_SHORTCUTS = "UpdateShortcuts",
    UPDATE_OPENED_PANEL = "UpdateOpenedPanel"
}

export enum UIModuleActions {
    TOGGLE_DAILY_FORECAST = "toggleDailyForecast",
    SHARE = "shareSnaly",
    REGISTER_SHORTCUT = "RegisterShortcut",
    OPEN_PANEL = "OpenPanel",
    CLOSE_PANEL = "ClosePanel"
}

export enum UIModuleGetter {
    OPENED_FORECAST = "openedForecast"
}

export const uiModule: Module<UIModuleState, RootState> = {
    state: {
        openedForecast: null,
        canShare: sharingService.canShare,
        openedPanel: null,
        shortcuts: [],
        screen: screenInspectorService
    },
    mutations: {
        [UIModuleMutations.UPDATE_OPENED_DAILY_FORECAST]: (
            state: UIModuleState,
            forecast: Nullable<WeatherDailyForecast>
        ) => {
            state.openedForecast = forecast;
        },
        [UIModuleMutations.UPDATE_SHORTCUTS]: (state: UIModuleState, shortcuts: ShortcutResume[]) => {
            state.shortcuts = shortcuts;
        },
        [UIModuleMutations.UPDATE_OPENED_PANEL]: (state: UIModuleState, panelId: Nullable<string>) => {
            state.openedPanel = panelId;
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
                title: i18nService.t("share.title"),
                text: i18nService.t("share.description")
            };

            sharingService.share(shareRequest);
        },
        [UIModuleActions.REGISTER_SHORTCUT]: (
            { commit, state }: ActionContext<UIModuleState, RootState>,
            shortcut: Shortcut
        ) => {
            shortcutService.register(shortcut);
            commit(UIModuleMutations.UPDATE_SHORTCUTS, shortcutService.shortcuts);
        },
        [UIModuleActions.OPEN_PANEL]: (
            { commit }: ActionContext<UIModuleState, RootState>,
            panelId: Nullable<string>
        ) => {
            commit(UIModuleMutations.UPDATE_OPENED_PANEL, panelId);
        },
        [UIModuleActions.CLOSE_PANEL]: ({ commit }: ActionContext<UIModuleState, RootState>) => {
            commit(UIModuleMutations.UPDATE_OPENED_PANEL, null);
        },
        init({ dispatch }) {
            const shortcutsToRegister: Shortcut[] = [
                {
                    def: { key: "Escape" },
                    enabledOnInput: true,
                    action: () => dispatch(UIModuleActions.CLOSE_PANEL),
                    description: i18nService.t("shortcuts.closeAnyPanel")
                },
                {
                    def: { key: "s" },
                    action: () => dispatch(UIModuleActions.OPEN_PANEL, CITY_SEARCH_WIDGET_ID),
                    description: i18nService.t("shortcuts.openCitySearchPanel")
                },
                {
                    def: { key: "m" },
                    action: () => dispatch(UIModuleActions.OPEN_PANEL, NAV_WIDGET_ID),
                    description: i18nService.t("shortcuts.openNavigationPanel")
                }
            ];

            shortcutsToRegister.forEach(s => {
                dispatch(UIModuleActions.REGISTER_SHORTCUT, s);
            });
        }
    },
    getters: {
        [UIModuleGetter.OPENED_FORECAST]: (state: UIModuleState): Nullable<WeatherDailyForecast> => {
            return state.openedForecast;
        }
    }
};
