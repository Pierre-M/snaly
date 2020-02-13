"use strict";

import Vue from "vue";
import Vuex, { Store } from "vuex";
import { fakeCitySearchService, fakeGeolocationService } from "../../_mocks";
import {
    DEFAULT_COORDINATES,
    localizationModule,
    LocalizationModuleAction,
    LocalizationModuleAddressRequest,
    LocalizationModuleMutation,
    LocalizationModuleState
} from "@/store/module/localization.module";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";
import { generateCity } from "../../_mocks/generators/CityGenerator";
import { City } from "@/business/city-search/CitySearchService";

Vue.use(Vuex);

let store: Store<any>;

const BASE_STATE = { ...localizationModule.state };

describe("Vuex store: LocalizationModule - actions & mutations", () => {
    beforeEach(() => {
        store = new Store({
            modules: {
                localizationModule: {
                    ...localizationModule,
                    state: { ...BASE_STATE }
                }
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

    it("should update coordinates state only when received coordinates are not null", async () => {
        const coordinates = generateUserCoordinates();
        fakeGeolocationService.setReturnedValue(coordinates);
        await store.commit(LocalizationModuleMutation.UPDATE_GEOLOCATION_AUTH, true);

        await store.dispatch(LocalizationModuleAction.GET_COORDINATES);

        expect((store.state.localizationModule as LocalizationModuleState).coordinates).toEqual(coordinates);

        fakeGeolocationService.setReturnedValue(null);
        await store.dispatch(LocalizationModuleAction.GET_COORDINATES);

        expect((store.state.localizationModule as LocalizationModuleState).coordinates).toEqual(coordinates);
    });

    it("should set coordinates to default one if received coordinates and current coordinates are null", async () => {
        fakeGeolocationService.setReturnedValue(null);
        await store.commit(LocalizationModuleMutation.UPDATE_GEOLOCATION_AUTH, true);
        await store.dispatch(LocalizationModuleAction.GET_COORDINATES);

        expect((store.state.localizationModule as LocalizationModuleState).coordinates).toEqual(DEFAULT_COORDINATES);
    });

    it("should call for geocodingService with right coordinates and language upon getLocation action", () => {
        const coordinates = generateUserCoordinates();
        const language = "fr";

        store.dispatch(LocalizationModuleAction.GET_LOCATION, { coordinates, language });

        expect(fakeCitySearchService.getCityByCoordinates).toHaveBeenCalledWith({ coordinates, language });
    });

    it("should not call for geocodingService upon getLocation action if coordinates are null", () => {
        store.dispatch(LocalizationModuleAction.GET_LOCATION, null);

        expect(fakeCitySearchService.getCityByCoordinates).not.toHaveBeenCalled();
    });

    it("should update state upon getLocationAction only when location is not null", async () => {
        const city = generateCity();
        fakeCitySearchService.city = city;

        const locationRequest: LocalizationModuleAddressRequest = {
            coordinates: generateUserCoordinates(),
            language: "fr"
        };

        await store.dispatch(LocalizationModuleAction.GET_LOCATION, locationRequest);

        expect(store.state.localizationModule.location).toEqual(city);

        fakeCitySearchService.city = null;

        await store.dispatch(LocalizationModuleAction.GET_LOCATION, locationRequest);

        expect(store.state.localizationModule.location).toEqual(city);
    });

    it("should update geolocation request state and call for coordinates upon call on requestGeolocation action", async () => {
        await store.dispatch(LocalizationModuleAction.REQUEST_GEOLOCATION);
        expect(store.state.localizationModule.geolocationHasBeenRequested).toBe(true);
        expect(fakeGeolocationService.getCoordinates).toHaveBeenCalled();
    });
});

describe("Vuex store: LocalizationModule - getters", () => {
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
        const city: City = {
            name: "Paris",
            country: "France",
            countryCode: "fr",
            zipCode: "75001",
            coordinates: {
                latitude: 2,
                longitude: 48
            }
        };

        await store.commit(LocalizationModuleMutation.UPDATE_LOCATION, city);

        expect(store.getters.shortenedLocation).toEqual("Paris, FR");
    });
});
