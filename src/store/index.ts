import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import { Nullable } from "@/types/app";
import {
    GeolocationService,
    UserCoordinates
} from "@/business/geolocation/GeolocationService";
import { container } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { WallpaperService } from "@/ui/wallpaper/WallpaperService";
import { ContextualImage } from "@/core/image/ContextualImageService";
import {
    CurrentWeatherOverview,
    WeatherForecastEntry,
    WeatherService
} from "@/business/weather/WeatherService";

Vue.use(Vuex);

const geolocationService = container.resolve<GeolocationService>(
    DIToken.GEOLOCATION_SERVICE
);

const wallpaperService = container.resolve<WallpaperService>(
    DIToken.WALLPAPER_SERVICE
);

const weatherService = container.resolve<WeatherService>(
    DIToken.WEATHER_SERVICE
);

export interface AppState {
    coordinates: Nullable<UserCoordinates>;
    currentWeatherOverview: Nullable<CurrentWeatherOverview>;
    hourlyWeatherForecast: Nullable<WeatherForecastEntry[]>;
    wallpaper: Nullable<ContextualImage>;
}

const state: AppState = {
    coordinates: null,
    currentWeatherOverview: null,
    hourlyWeatherForecast: null,
    wallpaper: null
};

export default new Vuex.Store({
    state,
    mutations: {
        updateCoordinates(
            state: AppState,
            coordinates: Nullable<UserCoordinates>
        ) {
            state.coordinates = coordinates;
        },
        updateCurrentWeatherOverview(
            state: AppState,
            currentWeatherOverview: Nullable<CurrentWeatherOverview>
        ) {
            state.currentWeatherOverview = currentWeatherOverview;
        },
        updateHourlyWeatherForecast(
            state: AppState,
            weatherForecast: Nullable<WeatherForecastEntry[]>
        ) {
            state.hourlyWeatherForecast = weatherForecast;
        },
        updateWallpaper(state: AppState, wallpaper: Nullable<ContextualImage>) {
            state.wallpaper = wallpaper;
        }
    },
    actions: {
        async init(context: ActionContext<AppState, AppState>) {
            await context.dispatch("getCoordinates");
            context.dispatch("getHourlyWeatherForecast");
            await context.dispatch("getCurrentWeatherOverview");
            await context.dispatch("getWallpaper");
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

        async getHourlyWeatherForecast(
            context: ActionContext<AppState, AppState>
        ) {
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
    }
});
