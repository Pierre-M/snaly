"use strict";

import { uniqWith, isEqual } from "lodash";
import qs from "querystring";
import { FakeHttpClient } from "../../_mocks/FakeHttpClient";
import {
    BASE_UNSPLASH_FORMATTING_PARAMS,
    BASE_UNSPLASH_REQUEST,
    UNSPLASH_API_URL,
    UnsplashImageService
} from "@/core/image/UnsplashImageService";
import { ContextualImageRequest } from "@/core/image/ContextualImageService";
import { generateUnsplashResults } from "../../_mocks/UnsplashApiDataGenerator";

let httpClient: FakeHttpClient;
let service: UnsplashImageService;
let unsplashResponse: any;

describe("UnsplashImageService", () => {
    beforeEach(() => {
        unsplashResponse = generateUnsplashResults();
        httpClient = new FakeHttpClient();
        service = new UnsplashImageService(httpClient);
        httpClient.mockSuccessfullResponse(unsplashResponse);
    });

    it("it should call for Unsplash api with the right url and payload", async () => {
        const expectedParams: ContextualImageRequest = {
            query: "test",
            orientation: undefined,
            ...BASE_UNSPLASH_REQUEST
        };

        await service.get({ query: expectedParams.query });

        expect(httpClient.get).toHaveBeenCalledWith(
            UNSPLASH_API_URL,
            expectedParams
        );
    });

    it("it should return null if no data is returned by unsplash", async () => {
        httpClient.mockErroredResponse();

        const res = await service.get({ query: "test" });

        expect(res).toEqual(null);
    });

    it("it should pick random item among unsplash results", async () => {
        const query = "test";
        const res1 = await service.get({ query });
        const res2 = await service.get({ query });
        const res3 = await service.get({ query });
        const res4 = await service.get({ query });
        const hasAtLeastOneUniqItem =
            uniqWith([res1, res2, res3, res4], isEqual).length > 1;

        expect(hasAtLeastOneUniqItem).toBe(true);
    });

    it("should apply given parameters to unsplash image", async () => {
        const request: ContextualImageRequest = {
            query: "test",
            width: 1000,
            height: 500,
            dpr: 3
        };

        const expectedParams = {
            ...BASE_UNSPLASH_FORMATTING_PARAMS,
            w: request.width?.toString(),
            h: request.width?.toString(),
            dpi: request.dpr!.toString()
        };

        const res = await service.get(request);
        const params = qs.parse(res!.src.split("?")[1]);

        expect(params).toEqual(expectedParams);
    });
});
