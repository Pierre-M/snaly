"use strict";

import { ActionContext, ActionTree } from "vuex";
import { RootState } from "./state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { GestureService } from "@/core/hardware/GestureService";
import { LocalizationModuleAction, LocalizationModuleMutation } from "@/store/module/localization.module";
import { WallpaperModuleAction } from "@/store/module/wallpaper.module";
import { AppState } from "@/store/store";
import { DevToolsLogger } from "@/business/easter-eggs/DevToolsLogger";
import { Location } from "@/business/location-search/LocationSearchService";

const gestureService = container.resolve<GestureService>(DIToken.GESTURE_SERVICE);
const devToolsLogger = container.resolve<DevToolsLogger>(DIToken.DEVTOOLS_LOGGER);

export enum StoreAction {
    INIT = "init",
    SELECT_CITY = "StoreActionSelectCity"
}

export const actions: ActionTree<RootState, RootState> = {
    [StoreAction.INIT]: async (context: ActionContext<RootState, RootState>) => {
        await context.dispatch(LocalizationModuleAction.GET_COORDINATES);

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
    }
};
