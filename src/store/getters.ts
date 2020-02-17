"use strict";

import { GetterTree } from "vuex";
import { AppState } from "@/store/store";
import { RootState } from "@/store/state";
import { location, temperature } from "@/ui/core/vue-filters";

export const DEFAULT_APP_TITLE = "Snaly";

export enum GlobalGetter {
    APP_TITLE = "appTitle"
}

export const getters: GetterTree<RootState, RootState> = {
    [GlobalGetter.APP_TITLE]: (state: RootState) => {
        const overview = (state as AppState).weatherModule.current;
        const currentLocation = (state as AppState).localizationModule.location;

        if (!currentLocation || !overview) {
            return DEFAULT_APP_TITLE;
        }

        return `${temperature(overview.temperatureOverview.current)} 📍 ${location(currentLocation)}`;
    }
};
