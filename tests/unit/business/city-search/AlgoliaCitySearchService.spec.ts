"use strict";

import {
    ALGOLIA_API,
    ALGOLIA_BASE_REQUEST,
    AlgoliaCitySearchService
} from "@/business/city-search/AlgoliaCitySearchService";
import { fakeCityBuilder, fakeHttpClient } from "../../_mocks";
import { generateAlgoliaResults } from "../../_mocks/generators/AlgoliaDataGenerator";

let service: AlgoliaCitySearchService;

describe("AlgoliaCitySearchService", () => {
    beforeEach(() => {
        service = new AlgoliaCitySearchService(fakeHttpClient, fakeCityBuilder);
        fakeHttpClient.mockSuccessfullResponse(generateAlgoliaResults());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call for Algolia API with right url and payload", async () => {
        const query = "Paris";
        const language = "fr";
        const expectedPayload = {
            ...ALGOLIA_BASE_REQUEST,
            query,
            language
        };

        await service.getCities({ query, language });

        expect(fakeHttpClient.post).toHaveBeenCalledWith(ALGOLIA_API, expectedPayload);
    });

    it("should return rigth number of items based for given data", async () => {
        const results = generateAlgoliaResults();

        fakeHttpClient.mockSuccessfullResponse(results);

        const response = await service.getCities({ query: "Paris", language: "fr" });

        expect(response.length).toBe(results.hits.length);
    });

    it("should return an empty array in case of any issue with Algolia API", async () => {
        fakeHttpClient.mockErroredResponse();

        const response = await service.getCities({ query: "Paris", language: "fr" });

        expect(response).toEqual([]);
    });

    it("should exclude empty result entries", async () => {
        fakeCityBuilder.result = null;

        const response = await service.getCities({ query: "Paris", language: "fr" });

        expect(response).toEqual([]);
    });
});
