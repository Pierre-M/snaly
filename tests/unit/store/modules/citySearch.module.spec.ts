"use strict";

import Vue from "vue";
import Vuex, { Store } from "vuex";
import {
    citySearchModule,
    CitySearchModuleAction,
    CitySearchModuleMutation,
    CitySearchModuleRequest,
    CitySearchModuleState
} from "@/store/module/citySearch.module";
import { fakeCitySearchService } from "../../_mocks";
import { generateCity } from "../../_mocks/generators/CityGenerator";

Vue.use(Vuex);
let store: Store<any>;

describe("Vuex store : citySearch module", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                userPreferencesModule: { state: { local: "fr" } },
                citySearchModule
            }
        });
    });

    it("should call for CitySearchService with right payload upon getCities action", async () => {
        const request: CitySearchModuleRequest = {
            query: "Paris"
        };

        await store.dispatch(CitySearchModuleAction.GET_CITIES, request);

        expect(fakeCitySearchService.getCities).toHaveBeenCalledWith({ query: "Paris", language: "fr" });
    });

    it("should update state with retrieved results", async () => {
        const results = [generateCity()];
        fakeCitySearchService.results = results;

        const request: CitySearchModuleRequest = {
            query: "Paris"
        };

        await store.dispatch(CitySearchModuleAction.GET_CITIES, request);

        expect((store.state.citySearchModule as CitySearchModuleState).results).toEqual(results);
    });

    it("should update loading state during getCities action", () => {
        store.dispatch(CitySearchModuleAction.GET_CITIES, { query: "Paris" });

        expect((store.state.citySearchModule as CitySearchModuleState).loading).toBe(true);
    });

    it("should update loading state after getCities action", async () => {
        await store.dispatch(CitySearchModuleAction.GET_CITIES, { query: "Paris" });

        expect((store.state.citySearchModule as CitySearchModuleState).loading).toBe(false);
    });

    it("should be able to reset cities", async () => {
        store.commit(CitySearchModuleMutation.UPDATE_RESULTS, [generateCity()]);
        await store.dispatch(CitySearchModuleAction.RESET_CITIES);

        expect((store.state.citySearchModule as CitySearchModuleState).results).toEqual([]);
    });
});
