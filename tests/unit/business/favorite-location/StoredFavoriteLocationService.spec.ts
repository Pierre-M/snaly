"use strict";

import {
    FAVORITE_CITIES_STORAGE_KEY,
    StoredFavoriteLocationService
} from "@/business/favorite-locations/StoredFavoriteLocationService";
import { fakeStorageService } from "../../_mocks";
import { generateCity } from "../../_mocks/generators/CityGenerator";
import { generateUserCoordinates } from "../../_mocks/generators/UserCoordinatesGenerator";

let service: StoredFavoriteLocationService;

describe("StoredFavoriteLocationService", () => {
    beforeEach(() => {
        service = new StoredFavoriteLocationService(fakeStorageService);
    });

    afterEach(() => {
        fakeStorageService.clear();
    });

    it("should handle first city addition", () => {
        const city = generateCity();

        service.add(city);

        expect(fakeStorageService.set).toHaveBeenCalledWith(FAVORITE_CITIES_STORAGE_KEY, [city]);
    });

    it("should handle Nth city addition", () => {
        const alreadyStoredLocation = generateCity();
        const newCity = generateCity();

        fakeStorageService.returnedValue = [alreadyStoredLocation];

        service.add(newCity);

        expect(fakeStorageService.set).toHaveBeenCalledWith(FAVORITE_CITIES_STORAGE_KEY, [
            alreadyStoredLocation,
            newCity
        ]);
    });

    it("should be able to retrieve stored locations", () => {
        const city1 = generateCity({ name: "Lille" });
        const city2 = generateCity({ name: "Paris" });
        fakeStorageService.returnedValue = [city1, city2];

        const res = service.locations;

        expect(res).toEqual([city1, city2]);
    });

    it("should not add location if there is already a saved location with the same coordinates", () => {
        const coordinates = generateUserCoordinates();
        const city1 = generateCity({ name: "Paris", coordinates });
        const city2 = generateCity({ name: "Lille", coordinates });

        fakeStorageService.returnedValue = [city1];

        service.add(city2);

        expect(fakeStorageService.set).not.toHaveBeenCalledWith(FAVORITE_CITIES_STORAGE_KEY, city2);
    });

    it("should be able to remove a stored location", () => {
        const coordinates = generateUserCoordinates();
        const city1 = generateCity({ coordinates });
        const city2 = generateCity();
        const stored = [city1, city2];
        const toBeRemoved = generateCity({ coordinates });

        fakeStorageService.returnedValue = stored;

        service.remove(toBeRemoved);

        expect(fakeStorageService.set).toHaveBeenCalledWith(FAVORITE_CITIES_STORAGE_KEY, [city2]);
    });
});
