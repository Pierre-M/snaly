"use strict";

import { ActionContext, ActionTree } from "vuex";
import { RootState } from "./state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { GestureService } from "@/core/hardware/GestureService";
import { LocalizationModuleMutation } from "@/store/module/localization.module";
import { WallpaperModuleAction } from "@/store/module/wallpaper.module";
import { AppState } from "@/store/store";
import { DevToolsLogger } from "@/business/easter-eggs/DevToolsLogger";
import { Location } from "@/business/location-search/LocationSearchService";
import { ShareRequest, SharingService } from "@/core/browser/SharingService";
import { I18nService } from "@/core/i18n/I18nService";

const gestureService = container.resolve<GestureService>(DIToken.GESTURE_SERVICE);
const devToolsLogger = container.resolve<DevToolsLogger>(DIToken.DEVTOOLS_LOGGER);
const i18nService = container.resolve<I18nService>(DIToken.I18N_SERVICE);
const sharingService = container.resolve<SharingService>(DIToken.SHARING_SERVICE);

export enum StoreAction {
    INIT = "init",
    SELECT_CITY = "StoreActionSelectCity",
    SHARE = "ShareApp"
}

export const actions: ActionTree<RootState, RootState> = {
    [StoreAction.INIT]: async (context: ActionContext<RootState, RootState>) => {
        devToolsLogger.displayWelcomeMessage();

        if (gestureService.canHandleShake) {
            gestureService.onShake(() => {
                context.dispatch(
                    WallpaperModuleAction.REFRESH_WALLPAPER,
                    (context.state as AppState).weatherModule.current
                );
            });
        }
    },
    [StoreAction.SELECT_CITY]: ({ commit, dispatch }: ActionContext<RootState, RootState>, city: Location) => {
        commit(LocalizationModuleMutation.UPDATE_COORDINATES, city.coordinates);
    },
    [StoreAction.SHARE]: ({ rootState }: ActionContext<RootState, RootState>) => {
        const shareRequest: ShareRequest = {
            url: window.location.href,
            title: i18nService.t("share.title"),
            text: i18nService.t("share.description", (rootState as AppState).localizationModule.location?.name)
        };

        sharingService.share(shareRequest);
    }
};
