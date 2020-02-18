"use strict";

import {
    ALGOLIA_SEARCH_API,
    ALGOLIA_BASE_REQUEST,
    AlgoliaLocationSearchService,
    ALGOLIA_REVERSE_GEOCODING_API
} from "@/business/location-search/AlgoliaLocationSearchService";
import { fakeCityBuilder, fakeHttpClient } from "../../_mocks";
import { generateAlgoliaResults } from "../../_mocks/generators/AlgoliaDataGenerator";
import { generateCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";

let service: AlgoliaLocationSearchService;

describe("AlgoliaCitySearchService", () => {
    beforeEach(() => {
        service = new AlgoliaLocationSearchService(fakeHttpClient, fakeCityBuilder);
        fakeHttpClient.mockSuccessfullResponse(generateAlgoliaResults());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should not call for Algolia API for empty query", async () => {
        await service.getLocations({ query: "", language: "fr" });

        expect(fakeHttpClient.post).not.toHaveBeenCalled();
    });

    it("should return empty array for empty query", async () => {
        const res = await service.getLocations({ query: "", language: "fr" });

        expect(res).toEqual([]);
    });

    it("should call for Algolia API with right url and payload", async () => {
        const query = "Paris";
        const language = "fr";
        const expectedPayload = {
            ...ALGOLIA_BASE_REQUEST,
            query,
            language
        };

        await service.getLocations({ query, language });

        expect(fakeHttpClient.post).toHaveBeenCalledWith(ALGOLIA_SEARCH_API, expectedPayload);
    });

    it("should return an empty array in case of any issue with Algolia API", async () => {
        fakeHttpClient.mockErroredResponse();

        const response = await service.getLocations({ query: "Paris", language: "fr" });

        expect(response).toEqual([]);
    });

    it("should exclude empty result entries", async () => {
        fakeCityBuilder.result = null;

        const response = await service.getLocations({ query: "Paris", language: "fr" });

        expect(response).toEqual([]);
    });

    it("should exclude doubled results", async () => {
        const uniqResult = {
            name: "Paris",
            coordinates: {
                latitude: 48,
                longitude: 2
            },
            country: "France",
            countryCode: "fr",
            zipCode: "75000"
        };

        fakeCityBuilder.result = uniqResult;

        const response = await service.getLocations({ query: "Paris", language: "fr" });

        expect(response).toEqual([uniqResult]);
    });

    it("should call for Algolia API with right url and payload for geocoding request", async () => {
        const coordinates = generateCoordinates();
        const language = "fr";

        const expected = {
            hitsPerPage: 1,
            language,
            aroundLatLng: `${coordinates.latitude},${coordinates.longitude}`
        };

        await service.getLocationByCoordinates({ coordinates, language });

        expect(fakeHttpClient.get).toHaveBeenCalledWith(ALGOLIA_REVERSE_GEOCODING_API, expected);
    });

    it("should return null if anything wrong happen with Algolia api", async () => {
        const coordinates = generateCoordinates();
        const language = "en";
        fakeHttpClient.mockErroredResponse();

        const res = await service.getLocationByCoordinates({ coordinates, language });

        expect(res).toEqual(null);
    });

    it("should return built city", async () => {
        const coordinates = generateCoordinates();
        const language = "en";

        const res = await service.getLocationByCoordinates({ coordinates, language });

        expect(res).not.toEqual(null);
    });
});
