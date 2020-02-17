"use strict";

import { isEqual } from "lodash";
import { GetterTree } from "vuex";
import { AppState } from "@/store/store";
import { RootState } from "@/store/state";
import { temperature } from "@/ui/core/vue-filters";

export const DEFAULT_APP_TITLE = "Snaly";

export enum GlobalGetter {
    APP_TITLE = "appTitle",
    IS_CURRENT_LOCATION_FAVORITE = "isCurrentLocationFavorite"
}

export const getters: GetterTree<RootState, RootState> = {
    [GlobalGetter.APP_TITLE]: (state: RootState) => {
        const overview = (state as AppState).weatherModule.current;
        const location = (state as AppState).localizationModule.location;

        if (!location || !overview) {
            return DEFAULT_APP_TITLE;
        }

        return `${temperature(overview.temperatureOverview.current)} 📍 ${
            location.name
        }, ${location.countryCode.toUpperCase()}`;
    },
    [GlobalGetter.IS_CURRENT_LOCATION_FAVORITE]: (state: RootState) => {
        const currentLocation = (state as AppState).localizationModule.location;
        const favoriteLocations = (state as AppState).userPreferencesModule.favoriteLocations;

        if (!currentLocation) return false;

        return !!favoriteLocations.find(l => isEqual(l.coordinates, currentLocation.coordinates));
    }
};
