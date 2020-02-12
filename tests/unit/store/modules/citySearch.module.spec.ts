"use strict";

import Vue from "vue";
import Vuex, { Store } from "vuex";
import {
    citySearchModule,
    CitySearchModuleAction,
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
                citySearchModule
            }
        });
    });

    it("should call for CitySearchService with right payload upon getCities action", async () => {
        const request: CitySearchModuleRequest = {
            language: "fr",
            query: "Paris"
        };

        await store.dispatch(CitySearchModuleAction.GET_CITIES, request);

        expect(fakeCitySearchService.getCities).toHaveBeenCalledWith(request);
    });

    it("should update state with retrieved results", async () => {
        const results = [generateCity()];
        fakeCitySearchService.results = results;

        const request: CitySearchModuleRequest = {
            language: "fr",
            query: "Paris"
        };

        await store.dispatch(CitySearchModuleAction.GET_CITIES, request);

        expect((store.state.citySearchModule as CitySearchModuleState).results).toEqual(results);
    });
});
