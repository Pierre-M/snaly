"use strict";

import Vue from "vue";
import Vuex, { Store } from "vuex";
import { fakeGeocodingService, fakeGeolocationService } from "../../_mocks";
import { localizationModule, LocalizationModuleAction } from "@/store/module/localizationModule";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";
import { generateUserLocation } from "../../_mocks/generators/LocalizationGenerator";

Vue.use(Vuex);

let store: Store<any>;

describe("coordinates store module", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                localizationModule
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call for geoLocationService upon getCoordinates action", () => {
        store.dispatch(LocalizationModuleAction.GET_COORDINATES);

        expect(fakeGeolocationService.getCoordinates).toHaveBeenCalled();
    });

    it("should update state with new coordinates", async () => {
        const coordinates = generateUserCoordinates();
        fakeGeolocationService.setReturnedValue(coordinates);

        await store.dispatch(LocalizationModuleAction.GET_COORDINATES);

        expect(store.state.localizationModule.coordinates).toEqual(coordinates);
    });

    it("should call for geocodingService with right coordinates upon getLocation action", () => {
        const coordinates = generateUserCoordinates();

        store.dispatch(LocalizationModuleAction.GET_LOCATION, coordinates);

        expect(fakeGeocodingService.getAddress).toHaveBeenCalledWith(coordinates);
    });

    it("should not call for geocodingService upon getLocation action if coordinates are null", () => {
        store.dispatch(LocalizationModuleAction.GET_LOCATION, null);

        expect(fakeGeocodingService.getAddress).not.toHaveBeenCalled();
    });

    it("should update state upon getLocationAction when location is null or not", async () => {
        const location = generateUserLocation();
        fakeGeocodingService.returnedValue = location;

        await store.dispatch(LocalizationModuleAction.GET_LOCATION, generateUserCoordinates());

        expect(store.state.localizationModule.location).toEqual(location);

        fakeGeocodingService.returnedValue = null;

        await store.dispatch(LocalizationModuleAction.GET_LOCATION, generateUserCoordinates());

        expect(store.state.localizationModule.location).toEqual(null);
    });
});
