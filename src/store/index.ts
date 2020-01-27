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
    CurrentWeatherService
} from "@/business/weather/WeatherService";

Vue.use(Vuex);

const geolocationService = container.resolve<GeolocationService>(
    DIToken.GEOLOCATION_SERVICE
);

const wallpaperService = container.resolve<WallpaperService>(
    DIToken.WALLPAPER_SERVICE
);

const currentWeatherService = container.resolve<CurrentWeatherService>(
    DIToken.CURRENT_WEATHER_SERVICE
);

export interface AppState {
    coordinates: Nullable<UserCoordinates>;
    currentWeatherOverview: Nullable<CurrentWeatherOverview>;
    wallpaper: Nullable<ContextualImage>;
}

const state: AppState = {
    coordinates: null,
    currentWeatherOverview: null,
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
        updateWallpaper(state: AppState, wallpaper: Nullable<ContextualImage>) {
            state.wallpaper = wallpaper;
        }
    },
    actions: {
        async init(context: ActionContext<AppState, AppState>) {
            await context.dispatch("getCoordinates");
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

            const weatherOverview = await currentWeatherService.getCurrentWeatherByCoordinates(
                coordinates
            );

            context.commit("updateCurrentWeatherOverview", weatherOverview);
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
