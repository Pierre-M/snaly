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
import { CurrentWeatherOverview, WeatherServiceRequest } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import {
    dailyForecastsModule,
    DailyForecastsModuleAction,
    DailyForecastsModuleState,
    WeatherModuleRequest
} from "@/store/module/dailyForecasts.module";
import { UIModuleState, uiModule } from "@/store/module/ui.module";
import { userPreferencesModule, UserPreferencesModuleState } from "@/store/module/userPreferences.module";

Vue.use(Vuex);

export interface AppState {
    wallpaperModule: WallpaperModuleState;
    localizationModule: LocalizationModuleState;
    currentWeatherModule: CurrentWeatherModuleState;
    dailyForecastsModule: DailyForecastsModuleState;
    uiModule: UIModuleState;
    userPreferencesModule: UserPreferencesModuleState;
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
        uiModule,
        userPreferencesModule
    }
});

store.watch(
    (state: RootState) => (state as AppState).localizationModule.coordinates,
    (coordinates: Nullable<UserCoordinates>) => {
        const weatherRequest: WeatherModuleRequest = {
            unit: (store.state as AppState).userPreferencesModule.temperatureUnit,
            coordinates
        };

        store.dispatch(DailyForecastsModuleAction.GET_FORECAST, weatherRequest);
        store.dispatch(CurrentWeatherModuleAction.GET_CURRENT_WEATHER, weatherRequest);
        store.dispatch(LocalizationModuleAction.GET_LOCATION, coordinates);
    }
);

store.watch(
    (state: RootState) => (state as AppState).currentWeatherModule.overview,
    (overview: Nullable<CurrentWeatherOverview>) => {
        store.dispatch(WallpaperModuleAction.REFRESH_WALLPAPER, overview);
    }
);
