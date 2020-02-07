import Vue from "vue";
import Vuex from "vuex";
import { RootState, state } from "@/store/state";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";
import { getters } from "@/store/getters";

import { wallpaperModule, WallpaperModuleAction, WallpaperModuleState } from "@/store/module/wallpaper.module";

import {
    localizationModule,
    LocalizationModuleAction,
    LocalizationModuleState
} from "@/store/module/localization.module";

import {
    currentWeatherModule,
    CurrentWeatherModuleAction,
    CurrentWeatherModuleState
} from "@/store/module/currentWeather.module";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import {
    dailyForecastsModule,
    DailyForecastsModuleAction,
    DailyForecastsModuleState
} from "@/store/module/dailyForecasts.module";
import { UIModuleState, uiModule } from "@/store/module/ui.module";

Vue.use(Vuex);

export interface AppState {
    wallpaperModule: WallpaperModuleState;
    localizationModule: LocalizationModuleState;
    currentWeatherModule: CurrentWeatherModuleState;
    dailyForecastsModule: DailyForecastsModuleState;
    uiModule: UIModuleState;
}

export const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        wallpaperModule,
        localizationModule,
        currentWeatherModule,
        dailyForecastsModule,
        uiModule
    }
});

store.watch(
    (state: RootState) => (state as AppState).localizationModule.coordinates,
    (coordinates: Nullable<UserCoordinates>) => {
        store.dispatch(DailyForecastsModuleAction.GET_FORECAST, coordinates);
        store.dispatch(CurrentWeatherModuleAction.GET_BY_COORDINATE, coordinates);
        store.dispatch(LocalizationModuleAction.GET_LOCATION, coordinates);
    }
);

store.watch(
    (state: RootState) => (state as AppState).currentWeatherModule.overview,
    (overview: Nullable<CurrentWeatherOverview>) => {
        store.dispatch(WallpaperModuleAction.REFRESH_WALLPAPER, overview);
    }
);
