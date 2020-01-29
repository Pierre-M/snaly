"use strict";

import { ActionContext, Module } from "vuex";
import { container } from "tsyringe";
import { Nullable } from "@/types/app";
import { ContextualImage } from "@/core/image/ContextualImageService";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { RootState } from "@/store/state";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { IWallpaperService } from "@/ui/wallpaper/WallpaperService";

const wallpaperService = container.resolve<IWallpaperService>(DIToken.WALLPAPER_SERVICE);

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
        updateWallpaper(state: WallpaperModuleState, wallpaper: Nullable<ContextualImage>) {
            state.wallpaper = wallpaper;
        }
    },
    actions: {
        [WallpaperModuleAction.REFRESH_WALLPAPER]: async (
            { commit }: ActionContext<WallpaperModuleState, RootState>,
            weatherOverview: Nullable<CurrentWeatherOverview>
        ) => {
            if (!weatherOverview) {
                return;
            }

            const wallpaper = await wallpaperService.get(weatherOverview.description.text);

            commit("updateWallpaper", wallpaper);
        }
    }
};
