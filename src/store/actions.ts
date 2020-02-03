"use strict";

import { ActionContext, ActionTree } from "vuex";
import { RootState } from "./state";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { GestureService } from "@/core/hardware/GestureService";
import { LocalizationModuleAction } from "@/store/module/localizationModule";
import { WallpaperModuleAction } from "@/store/module/wallpaper.module";
import { AppState } from "@/store/store";

const gestureService = container.resolve<GestureService>(DIToken.GESTURE_SERVICE);

export const actions: ActionTree<RootState, RootState> = {
    async init(context: ActionContext<RootState, RootState>) {
        await context.dispatch(LocalizationModuleAction.GET_COORDINATES);

        if (gestureService.canHandleShake) {
            gestureService.onShake(() => {
                context.dispatch(
                    WallpaperModuleAction.REFRESH_WALLPAPER,
                    (context.state as AppState).currentWeatherModule.overview
                );
            });
        }
    }
};
