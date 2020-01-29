"use strict";

import { ActionContext, ActionTree } from "vuex";
import { RootState } from "./state";
import { Nullable } from "@/types/app";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { WeatherService } from "@/business/weather/WeatherService";
import { GestureService } from "@/core/hardware/GestureService";
import { CoordinatesModuleAction } from "@/store/module/coordinates.module";
import { WallpaperModuleAction } from "@/store/module/wallpaper.module";
import { AppState } from "@/store/index";

const weatherService = container.resolve<WeatherService>(
    DIToken.WEATHER_SERVICE
);

const gestureService = container.resolve<GestureService>(
    DIToken.GESTURE_SERVICE
);

export const actions: ActionTree<RootState, RootState> = {
    async init(context: ActionContext<RootState, RootState>) {
        await context.dispatch(CoordinatesModuleAction.GET_COORDINATES);

        if (gestureService.canHandleShake) {
            gestureService.onShake(() => {
                context.dispatch(
                    WallpaperModuleAction.REFRESH_WALLPAPER,
                    (context.state as AppState).currentWeatherModule.overview
                );
            });
        }
    },

    async getHourlyWeatherForecastByCoordinates(
        { commit }: ActionContext<RootState, RootState>,
        coordinates: Nullable<UserCoordinates>
    ) {
        if (!coordinates) {
            return;
        }

        const weatherForecast = await weatherService.getHourlyForecastByCoordinates(
            coordinates
        );

        commit("updateHourlyWeatherForecast", weatherForecast);
    }
};
