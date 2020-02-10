"use strict";

import { GetterTree } from "vuex";
import { AppState } from "@/store/store";
import { RootState } from "@/store/state";
import { temperature } from "@/ui/core/vue-filters";

export const DEFAULT_APP_TITLE = "Snaly";

export const getters: GetterTree<RootState, RootState> = {
    appTitle(state: RootState) {
        const overview = (state as AppState).weatherModule.current;
        const location = (state as AppState).localizationModule.location;

        if (!location || !overview) {
            return DEFAULT_APP_TITLE;
        }

        return `${temperature(overview.temperatureOverview.current)} 📍 ${
            location.city
        }, ${location.countryCode.toUpperCase()}`;
    }
};
