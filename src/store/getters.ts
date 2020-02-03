"use strict";

import { GetterTree } from "vuex";
import { AppState } from "@/store/store";
import { RootState } from "@/store/state";

export const DEFAULT_APP_TITLE = "Snaly";

export const getters: GetterTree<RootState, RootState> = {
    appTitle(state: RootState) {
        const overview = (state as AppState).currentWeatherModule.overview;
        const location = (state as AppState).localizationModule.location;

        if (!location || !overview) {
            return DEFAULT_APP_TITLE;
        }

        return `${overview.temperatureOverview.current}° 📍 ${location.city}, ${location.countryCode.toUpperCase()}`;
    }
};