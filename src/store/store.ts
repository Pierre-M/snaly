import Vue from "vue";
import Vuex from "vuex";
import { isEqual } from "lodash";
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
    weatherModule,
    WeatherModuleAction,
    WeatherModuleRequest,
    WeatherModuleState
} from "@/store/module/weather.module";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { CurrentWeatherOverview } from "@/business/weather/WeatherService";
import { Nullable } from "@/types/app";
import { UIModuleState, uiModule } from "@/store/module/ui.module";
import { userPreferencesModule, UserPreferencesModuleState } from "@/store/module/userPreferences.module";

Vue.use(Vuex);

export interface AppState {
    wallpaperModule: WallpaperModuleState;
    localizationModule: LocalizationModuleState;
    weatherModule: WeatherModuleState;
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
        weatherModule,
        uiModule,
        userPreferencesModule
    }
});

store.watch(
    (state: RootState) => (state as AppState).localizationModule.coordinates,
    (newCoordinates: Nullable<UserCoordinates>, oldCoordinates: Nullable<UserCoordinates>) => {
        if (isEqual(newCoordinates, oldCoordinates)) return;

        const weatherRequest: WeatherModuleRequest = {
            unit: (store.state as AppState).userPreferencesModule.temperatureUnit,
            coordinates: newCoordinates
        };

        store.dispatch(WeatherModuleAction.GET_FORECAST, weatherRequest);
        store.dispatch(WeatherModuleAction.GET_CURRENT_WEATHER, weatherRequest);
        store.dispatch(LocalizationModuleAction.GET_LOCATION, newCoordinates);
    }
);

store.watch(
    (state: RootState) => (state as AppState).weatherModule.current,
    (newOverview: Nullable<CurrentWeatherOverview>, oldOverview: Nullable<CurrentWeatherOverview>) => {
        if (isEqual(newOverview, oldOverview)) return;

        store.dispatch(WallpaperModuleAction.REFRESH_WALLPAPER, newOverview);
    }
);
