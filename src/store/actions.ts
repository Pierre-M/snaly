"use strict";

import { ActionContext, ActionTree } from "vuex";
import { RootState } from "./state";
import { Nullable } from "@/types/app";
import {
    GeolocationService,
    UserCoordinates
} from "@/business/geolocation/GeolocationService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { WeatherService } from "@/business/weather/WeatherService";
import { GestureService } from "@/core/hardware/GestureService";

const geolocationService = container.resolve<GeolocationService>(
    DIToken.GEOLOCATION_SERVICE
);

const weatherService = container.resolve<WeatherService>(
    DIToken.WEATHER_SERVICE
);

const gestureService = container.resolve<GestureService>(
    DIToken.GESTURE_SERVICE
);

export const actions: ActionTree<RootState, RootState> = {
    async init(context: ActionContext<RootState, RootState>) {
        await context.dispatch("getCoordinates");

        if (gestureService.canHandleShake) {
            gestureService.onShake(() => {
                context.dispatch(
                    "getWallpaperByWeatherOverview",
                    context.state.currentWeatherOverview
                );
            });
        }
    },

    async getCoordinates(context: ActionContext<RootState, RootState>) {
        const coordinates = await geolocationService.getCoordinates();
        context.commit("updateCoordinates", coordinates);
    },

    async getCurrentWeatherOverviewByCoordinates(
        { commit }: ActionContext<RootState, RootState>,
        coordinates: Nullable<UserCoordinates>
    ) {
        if (!coordinates) {
            return;
        }

        const weatherOverview = await weatherService.getCurrentWeatherByCoordinates(
            coordinates
        );

        commit("updateCurrentWeatherOverview", weatherOverview);
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
