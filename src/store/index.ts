import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
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
import { WeatherIconService } from "@/ui/weather-icons/WeatherIconService";
import { WallpaperService } from "@/ui/wallpaper/WallpaperService";
import { ContextualImage } from "@/core/image/ContextualImageService";

Vue.use(Vuex);

const geolocationService = container.resolve<GeolocationService>(
    DIToken.GEOLOCATION_SERVICE
);

const weatherService = container.resolve<WeatherService>(
    DIToken.WEATHER_SERVICE
);

const wallpaperService = container.resolve<WallpaperService>(
    DIToken.WALLPAPER_SERVICE
);

const weatherIconService = new WeatherIconService();

export interface AppState {
    coordinates: Nullable<Coordinates>;
    weather: Nullable<CurrentWeather>;
    wallpaper: Nullable<ContextualImage>;
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
        updateWallpaper(state: AppState, wallpaper: Nullable<ContextualImage>) {
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

            const wallpaper = await wallpaperService.get(
                context.state.weather.description
            );

            context.commit("updateWallpaper", wallpaper);
        },
    },
    getters: {
        weatherIcon(state: AppState): Nullable<string> {
            if (!state.weather) {
                return null;
            }

            return weatherIconService.getByWeatherId(state.weather.icon);
        },
    },
});
