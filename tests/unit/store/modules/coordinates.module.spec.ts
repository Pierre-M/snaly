"use strict";

import Vue from "vue";
import Vuex, { Store } from "vuex";
import { fakeGeolocationService } from "../../_mocks";
import {
    coordinatesModule,
    CoordinatesModuleAction
} from "@/store/module/coordinates.module";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";

Vue.use(Vuex);

let store: Store<any>;

describe("coordinates store module", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                coordinatesModule
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call for geoLocationService upon getlocation action", () => {
        store.dispatch(CoordinatesModuleAction.GET_COORDINATES);

        expect(fakeGeolocationService.getCoordinates).toHaveBeenCalled();
    });

    it("should update state with new coordinates", async () => {
        const coordinates = generateUserCoordinates();
        fakeGeolocationService.setReturnedValue(coordinates);

        await store.dispatch(CoordinatesModuleAction.GET_COORDINATES);

        expect(store.state.coordinatesModule.coordinates).toEqual(coordinates);
    });
});
