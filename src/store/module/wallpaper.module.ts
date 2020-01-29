"use strict";

import { ContextualImage } from "@/core/image/ContextualImageService";
import { RootState } from "@/store/state";
import { ActionContext, Module } from "vuex";
import { Nullable } from "@/types/app";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { container } from "tsyringe";
import { IWallpaperService } from "@/ui/wallpaper/WallpaperService";
import { DIToken } from "@/core/dependency-injection/DIToken";

const wallpaperService = container.resolve<IWallpaperService>(
    DIToken.WALLPAPER_SERVICE
);

export interface WallpaperModuleState {
    wallpaper: Nullable<ContextualImage>;
}

export enum WallpaperModuleAction {
    REFRESH_WALLPAPER = "refreshWallpaper"
}

export const wallpaperModule: Module<WallpaperModuleState, RootState> = {
    state: {
        wallpaper: null
    },
    mutations: {
        updateWallpaper(
            state: WallpaperModuleState,
            wallpaper: Nullable<ContextualImage>
        ) {
            state.wallpaper = wallpaper;
        }
    },
    actions: {
        [WallpaperModuleAction.REFRESH_WALLPAPER]: async function(
            { commit }: ActionContext<WallpaperModuleState, RootState>,
            weatherOverview: Nullable<CurrentWeatherOverview>
        ) {
            if (!weatherOverview) {
                return;
            }

            const wallpaper = await wallpaperService.get(
                weatherOverview.description.text
            );

            commit("updateWallpaper", wallpaper);
        }
    }
};
