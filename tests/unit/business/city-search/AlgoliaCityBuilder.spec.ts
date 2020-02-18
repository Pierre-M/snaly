"use strict";

import { AlgoliaLocationBuilder } from "@/business/location-search/AlgoliaLocationBuilder";
import { fakeAlertingService } from "../../_mocks";
import { Location } from "@/business/location-search/LocationSearchService";
import { generateAlgoliaCityResultData } from "../../_mocks/generators/AlgoliaDataGenerator";

let builder: AlgoliaLocationBuilder;

describe("AlgoliaCityBuilder", () => {
    beforeEach(() => {
        builder = new AlgoliaLocationBuilder(fakeAlertingService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return right city given Algolia data", () => {
        const expected: Location = {
            name: "Paris",
            country: "France",
            countryCode: "fr",
            zipCode: "75001",
            coordinates: {
                latitude: 48,
                longitude: 2
            }
        };

        const data = generateAlgoliaCityResultData({ city: expected });

        expect(builder.build(data)).toEqual(expected);
    });

    it("should return null if anything goes wrong with given data", () => {
        const data = generateAlgoliaCityResultData({ incomplete: true });

        expect(builder.build(data)).toEqual(null);
    });

    it("should log error if anything goes wrong with given data", () => {
        const data = generateAlgoliaCityResultData({ incomplete: true });

        builder.build(data);

        expect(fakeAlertingService.logError).toHaveBeenCalledWith(expect.any(Error));
    });
});
