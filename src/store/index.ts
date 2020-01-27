import Vue from "vue";
import Vuex from "vuex";
import { AppState, state } from "@/store/state";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

store.watch(
    (state: AppState) => state.coordinates,
    () => {
        store.dispatch("getHourlyWeatherForecast");
        store.dispatch("getCurrentWeatherOverview");
    }
);

store.watch(
    (state: AppState) => state.currentWeatherOverview,
    () => {
        store.dispatch("getWallpaper");
    }
);

export default store;
