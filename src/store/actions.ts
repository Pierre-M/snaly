"use strict";

import { ActionContext, ActionTree } from "vuex";
import { AppState } from "./state";
import { Nullable } from "@/types/app";
import {
    GeolocationService,
    UserCoordinates
} from "@/business/geolocation/GeolocationService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { WallpaperService } from "@/ui/wallpaper/WallpaperService";
import { WeatherService } from "@/business/weather/WeatherService";
import { GestureService } from "@/core/hardware/GestureService";

const geolocationService = container.resolve<GeolocationService>(
    DIToken.GEOLOCATION_SERVICE
);

const wallpaperService = container.resolve<WallpaperService>(
    DIToken.WALLPAPER_SERVICE
);

const weatherService = container.resolve<WeatherService>(
    DIToken.WEATHER_SERVICE
);

const gestureService = container.resolve<GestureService>(
    DIToken.GESTURE_SERVICE
);

export const actions: ActionTree<AppState, AppState> = {
    async init(context: ActionContext<AppState, AppState>) {
        await context.dispatch("getCoordinates");

        if (gestureService.canHandleShake) {
            gestureService.onShake(() => context.dispatch("getWallpaper"));
        }
    },

    async getCoordinates(context: ActionContext<AppState, AppState>) {
        const coordinates = await geolocationService.getCoordinates();
        context.commit("updateCoordinates", coordinates);
    },

    async getCurrentWeatherOverview(
        context: ActionContext<AppState, AppState>
    ) {
        const coordinates: Nullable<UserCoordinates> =
            context.state.coordinates;

        if (!coordinates) {
            return;
        }

        const weatherOverview = await weatherService.getCurrentWeatherByCoordinates(
            coordinates
        );

        context.commit("updateCurrentWeatherOverview", weatherOverview);
    },

    async getHourlyWeatherForecast(context: ActionContext<AppState, AppState>) {
        const coordinates: Nullable<UserCoordinates> =
            context.state.coordinates;

        if (!coordinates) {
            return;
        }

        const weatherForecast = await weatherService.getHourlyForecastByCoordinates(
            coordinates
        );

        context.commit("updateHourlyWeatherForecast", weatherForecast);
    },

    async getWallpaper(context: ActionContext<AppState, AppState>) {
        if (!context.state.currentWeatherOverview) {
            return;
        }

        const wallpaper = await wallpaperService.get(
            context.state.currentWeatherOverview.description.text
        );

        context.commit("updateWallpaper", wallpaper);
    }
};
