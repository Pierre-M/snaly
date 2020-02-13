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
    loading: boolean;
}

export enum WallpaperModuleAction {
    REFRESH_WALLPAPER = "refreshWallpaper"
}

export enum WallpaperModuleMutation {
    UPDATE_LOADING_STATE = "UpdateWallpaperLoadingState"
}

export const wallpaperModule: Module<WallpaperModuleState, RootState> = {
    state: {
        wallpaper: null,
        loading: true
    },
    mutations: {
        updateWallpaper(state: WallpaperModuleState, wallpaper: Nullable<ContextualImage>) {
            state.wallpaper = wallpaper;
        },
        [WallpaperModuleMutation.UPDATE_LOADING_STATE]: (state: WallpaperModuleState, isLoading: boolean) => {
            state.loading = isLoading;
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

            commit(WallpaperModuleMutation.UPDATE_LOADING_STATE, true);
            const wallpaper = await wallpaperService.get(weatherOverview.description.text);
            commit("updateWallpaper", wallpaper);
            commit(WallpaperModuleMutation.UPDATE_LOADING_STATE, false);
        }
    }
};
