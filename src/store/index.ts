import Vue from "vue";
import Vuex, { ActionContext, Store } from "vuex";
import {
    CurrentWeather,
    WeatherService,
} from "@/business/weather-api/WeatherService";
import { Nullable } from "@/types/app";
import {
    Coordinates,
    GeolocationService,
} from "@/business/geolocation/GeolocationService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import {
    ContextualWallpaperService,
    Wallpaper,
} from "@/business/wallpaper/ContextualWallpaperService";

Vue.use(Vuex);

const geolocationService = container.resolve<GeolocationService>(
    DIToken.GEOLOCATION_SERVICE
);

const weatherService = container.resolve<WeatherService>(
    DIToken.WEATHER_SERVICE
);

const wallpaperService = container.resolve<ContextualWallpaperService>(
    DIToken.WALLPAPER_SERVICE
);

export interface AppState {
    coordinates: Nullable<Coordinates>;
    weather: Nullable<CurrentWeather>;
    wallpaper: Nullable<Wallpaper>;
}

const state: AppState = {
    coordinates: null,
    weather: null,
    wallpaper: null,
};

export default new Vuex.Store({
    state,
    mutations: {
        updateCoordinates(state: AppState, coordinates: Nullable<Coordinates>) {
            state.coordinates = coordinates;
        },
        updateCurrentWeather(
            state: AppState,
            currentWeather: Nullable<CurrentWeather>
        ) {
            state.weather = currentWeather;
        },
        updateWallpaper(state: AppState, wallpaper: Nullable<Wallpaper>) {
            state.wallpaper = wallpaper;
        },
    },
    actions: {
        async init(context: ActionContext<AppState, AppState>) {
            await context.dispatch("getCoordinates");
            await context.dispatch("getWeather");
            await context.dispatch("getWallpaper");
        },

        async getCoordinates(context: ActionContext<AppState, AppState>) {
            const coordinates = await geolocationService.getCoordinates();
            context.commit("updateCoordinates", coordinates);
        },

        async getWeather(context: ActionContext<AppState, AppState>) {
            const coordinates: Nullable<Coordinates> =
                context.state.coordinates;

            if (!coordinates) {
                return;
            }

            const weather = await weatherService.getByCoordinates(coordinates);

            context.commit("updateCurrentWeather", weather);
        },

        async getWallpaper(context: ActionContext<AppState, AppState>) {
            if (!context.state.weather) {
                return;
            }

            const wallpaper = await wallpaperService.getWallpaper(
                context.state.weather.description
            );

            context.commit("updateWallpaper", wallpaper);
        },
    },
});
