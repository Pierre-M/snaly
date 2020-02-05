"use strict";

import Vue from "vue";
import Vuex, { Store } from "vuex";
import { fakeGeocodingService, fakeGeolocationService } from "../../_mocks";
import {
    DEFAULT_COORDINATES,
    localizationModule,
    LocalizationModuleAction,
    LocalizationModuleMutation,
    LocalizationModuleState
} from "@/store/module/localization.module";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";
import { generateUserLocation } from "../../_mocks/generators/LocalizationGenerator";
import { UserLocation } from "@/business/geocoding/GeocodingService";

Vue.use(Vuex);

let store: Store<any>;

const SCENARIO_PREFIX = "store:localizationModule -";

describe(`${SCENARIO_PREFIX} actions & mutations`, () => {
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

    it("should not call for geoLocationService upon getCoordinates action if user has not allowed geolocation", () => {
        store.dispatch(LocalizationModuleAction.GET_COORDINATES);

        expect(fakeGeolocationService.getCoordinates).not.toHaveBeenCalled();
    });

    it("should set coordinates to default one upon getCoordinates action if user has not allowed geolocation", async () => {
        await store.dispatch(LocalizationModuleAction.GET_COORDINATES);

        const coordinates = (store.state.localizationModule as LocalizationModuleState).coordinates;

        expect(coordinates).toEqual(DEFAULT_COORDINATES);
    });

    it("should call for geoLocationService upon getCoordinates action if geolocation is allowed", async () => {
        await store.commit(LocalizationModuleMutation.UPDATE_GEOLOCATION_AUTH, true);
        store.dispatch(LocalizationModuleAction.GET_COORDINATES);

        expect(fakeGeolocationService.getCoordinates).toHaveBeenCalled();
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

describe(`${SCENARIO_PREFIX} getters`, () => {
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

    it("should return null for shortened location if location is not set", () => {
        expect(store.getters.shortenedLocation).toEqual(null);
    });

    it("should return location with right format if location is set", async () => {
        const location: UserLocation = {
            city: "Paris",
            country: "France",
            countryCode: "fr",
            zipCode: "75001"
        };

        await store.commit(LocalizationModuleMutation.UPDATE_LOCATION, location);

        expect(store.getters.shortenedLocation).toEqual("Paris, FR");
    });
});
