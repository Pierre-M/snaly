"use strict";

import { TemperatureUnit } from "@/business/weather/WeatherService";
import { RootState } from "@/store/state";
import { ActionContext, Module } from "vuex";
import { FavoriteLocation, FavoriteLocationsService } from "@/business/favorite-locations/FavoriteLocationsService";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { container } from "tsyringe";
import { StoreAction } from "@/store/actions";
import { Location } from "@/business/location-search/LocationSearchService";

const favoriteLocationsService = container.resolve<FavoriteLocationsService>(DIToken.FAVORITE_LOCATIONS_SERVICE);

export interface UserPreferencesModuleState {
    temperatureUnit: TemperatureUnit;
    local: string;
    favoriteLocations: FavoriteLocation[];
}

export enum UserPreferencesModuleMutation {
    UPDATE_FAVORITE_LOCATIONS = "UpdateFavoriteLocations"
}

export enum UserPreferencesModuleAction {
    ADD_FAVORITE_LOCATION = "AddFavoriteLocation",
    REMOVE_FAVORITE_LOCATION = "RemoveFavoriteLocation"
}

export const userPreferencesModule: Module<UserPreferencesModuleState, RootState> = {
    state: {
        temperatureUnit: TemperatureUnit.CELSIUS,
        local: "en",
        favoriteLocations: []
    },
    mutations: {
        [UserPreferencesModuleMutation.UPDATE_FAVORITE_LOCATIONS]: (
            state: UserPreferencesModuleState,
            locations: FavoriteLocation[]
        ) => {
            state.favoriteLocations = locations;
        }
    },
    actions: {
        [StoreAction.INIT]: ({ commit }: ActionContext<UserPreferencesModuleState, RootState>) => {
            const storedLocations = favoriteLocationsService.locations;
            commit(UserPreferencesModuleMutation.UPDATE_FAVORITE_LOCATIONS, storedLocations);
        },
        [UserPreferencesModuleAction.ADD_FAVORITE_LOCATION]: (
            { commit }: ActionContext<UserPreferencesModuleState, RootState>,
            city: Location
        ) => {
            favoriteLocationsService.add(city);

            commit(UserPreferencesModuleMutation.UPDATE_FAVORITE_LOCATIONS, favoriteLocationsService.locations);
        },
        [UserPreferencesModuleAction.REMOVE_FAVORITE_LOCATION]: (
            { commit }: ActionContext<UserPreferencesModuleState, RootState>,
            city: Location
        ) => {
            favoriteLocationsService.remove(city);

            commit(UserPreferencesModuleMutation.UPDATE_FAVORITE_LOCATIONS, favoriteLocationsService.locations);
        }
    }
};
