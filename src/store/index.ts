import Vue from "vue";
import Vuex from "vuex";
import { RootState, state } from "@/store/state";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";

import {
    wallpaperModule,
    WallpaperModuleState
} from "@/store/module/wallpaper.module";

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        wallpaperModule
    }
});

export interface AppState extends RootState {
    wallpaperModule: WallpaperModuleState;
}

store.watch(
    state => state.coordinates,
    coordinates => {
        store.dispatch("getHourlyWeatherForecastByCoordinates", coordinates);
        store.dispatch("getCurrentWeatherOverviewByCoordinates", coordinates);
    }
);

store.watch(
    (state: RootState) => state.currentWeatherOverview,
    overview => {
        store.dispatch("getWallpaperByWeatherOverview", overview);
    }
);

export default store;
