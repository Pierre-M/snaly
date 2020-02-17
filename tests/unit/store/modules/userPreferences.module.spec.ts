"use strict";

import Vue from "vue";
import Vuex, { Store } from "vuex";
import {
    userPreferencesModule,
    UserPreferencesModuleAction,
    UserPreferencesModuleState
} from "@/store/module/userPreferences.module";
import { initStoreWithModule } from "../../_utils";
import { fakeFavoriteLocationsService } from "../../_mocks";
import { generateCity } from "../../_mocks/generators/CityGenerator";
import { StoreAction } from "@/store/actions";

Vue.use(Vuex);

let store: Store<any>;

describe("Vuex store : user preferences module", () => {
    beforeEach(() => {
        store = initStoreWithModule<UserPreferencesModuleState, {}>("userPreferencesModule", userPreferencesModule);
    });

    afterEach(() => {
        fakeFavoriteLocationsService.returnedValue = [];
        jest.clearAllMocks();
    });

    it("should have empty favorite locations by default", () => {
        expect((store.state.userPreferencesModule as UserPreferencesModuleState).favoriteLocations).toEqual([]);
    });

    it("should be initialized with stored favorite locations", () => {
        const stored = [generateCity()];
        fakeFavoriteLocationsService.returnedValue = stored;

        store.dispatch(StoreAction.INIT);

        expect((store.state.userPreferencesModule as UserPreferencesModuleState).favoriteLocations).toEqual(stored);
    });

    it("should be able to add/remove a new favorite location", () => {
        const city = generateCity();
        fakeFavoriteLocationsService.returnedValue = [city];
        store.dispatch(UserPreferencesModuleAction.ADD_FAVORITE_LOCATION, city);

        expect(fakeFavoriteLocationsService.add).toHaveBeenCalledWith(city);
        expect((store.state.userPreferencesModule as UserPreferencesModuleState).favoriteLocations).toEqual([city]);

        fakeFavoriteLocationsService.returnedValue = [];
        store.dispatch(UserPreferencesModuleAction.REMOVE_FAVORITE_LOCATION, city);

        expect(fakeFavoriteLocationsService.remove).toHaveBeenCalledWith(city);
        expect((store.state.userPreferencesModule as UserPreferencesModuleState).favoriteLocations).toEqual([]);
    });
});
