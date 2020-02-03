import Vue from "vue";
import Vuex from "vuex";
import { RootState, state } from "@/store/state";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";

import { wallpaperModule, WallpaperModuleAction, WallpaperModuleState } from "@/store/module/wallpaper.module";

import { localizationModule, LocalizationModuleState } from "@/store/module/localizationModule";

import {
    currentWeatherModule,
    CurrentWeatherModuleAction,
    CurrentWeatherModuleState
} from "@/store/module/currentWeather.module";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import { hourlyForecastModule, HourlyForecastModuleAction } from "@/store/module/hourlyForecast.module";

Vue.use(Vuex);

export interface AppState {
    wallpaperModule: WallpaperModuleState;
    localizationModule: LocalizationModuleState;
    currentWeatherModule: CurrentWeatherModuleState;
}

export const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        wallpaperModule,
        localizationModule,
        currentWeatherModule,
        hourlyForecastModule
    }
});

store.watch(
    (state: RootState) => (state as AppState).localizationModule.coordinates,
    (coordinates: Nullable<UserCoordinates>) => {
        store.dispatch(HourlyForecastModuleAction.GET_FORECAST, coordinates);
        store.dispatch(CurrentWeatherModuleAction.GET_BY_COORDINATE, coordinates);
    }
);

store.watch(
    (state: RootState) => (state as AppState).currentWeatherModule.overview,
    (overview: Nullable<CurrentWeatherOverview>) => {
        store.dispatch(WallpaperModuleAction.REFRESH_WALLPAPER, overview);
    }
);
