"use strict";

import { FakeHttpClient } from "../_mocks/FakeHttpClient";
import {
    ALGOLIA_PLACES_API,
    ALGOLIA_PLACES_API_BASE_PARAMS,
    AlgoliaGeocodingService
} from "@/business/geocoding/AlgoliaGeocodingService";
import { generateUserCoordinates } from "../_mocks/generators/UserCoordinatesGenerator";
import { generateAlgoliaPlacesAPIResponse } from "../_mocks/generators/LocalizationGenerator";
import { UserLocation } from "@/business/geocoding/GeocodingService";

let httpClient: FakeHttpClient;
let service: AlgoliaGeocodingService;

describe("AlgoliaGeocodingService", () => {
    beforeEach(() => {
        httpClient = new FakeHttpClient();
        httpClient.mockSuccessfullResponse(generateAlgoliaPlacesAPIResponse());
        service = new AlgoliaGeocodingService(httpClient);
    });

    it("should call for Algolia places api with the right url and the right payload", async () => {
        const coordinates = generateUserCoordinates();
        const expectedParams = {
            ...ALGOLIA_PLACES_API_BASE_PARAMS,
            aroundLatLng: `${coordinates.latitude},${coordinates.longitude}`
        };

        await service.getAddress(coordinates);

        expect(httpClient.post).toHaveBeenCalledWith(ALGOLIA_PLACES_API, expectedParams);
    });

    it("should return null if anything wrong happen with Algolia api", async () => {
        const coordinates = generateUserCoordinates();
        httpClient.mockErroredResponse();

        const res = await service.getAddress(coordinates);

        expect(res).toEqual(null);
    });

    it("should return right UserLocation based on Algolia Places data", async () => {
        const expectedLocation: UserLocation = {
            city: "Paris",
            country: "France",
            countryCode: "fr",
            zipCode: "75001"
        };

        const coordinates = generateUserCoordinates();
        const apiResponse = generateAlgoliaPlacesAPIResponse(expectedLocation);
        httpClient.mockSuccessfullResponse(apiResponse);

        const res = await service.getAddress(coordinates);

        expect(res).toEqual(expectedLocation);
    });
});
