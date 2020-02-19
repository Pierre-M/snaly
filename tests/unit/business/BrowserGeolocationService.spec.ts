"use strict";

import { BrowserGeolocationService } from "@/business/geolocation/BrowserGeolocationService";
import { generateCoordinates } from "../_mocks/generators/UserCoordinatesGenerator";
import { Nullable } from "@/types/app";
import { LocationCoordinates } from "@/business/geolocation/GeolocationService";

let service: BrowserGeolocationService;

describe("BrowserGeolocationService", () => {
    beforeEach(() => {
        mockGeolocationApi();
        service = new BrowserGeolocationService();
    });

    it("should call for navigator native geolocation api", async () => {
        await service.getCoordinates();
        expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });

    it("should return coordinates when user accept geolocation", async () => {
        const coordinates = generateCoordinates();
        mockGeolocationApi(coordinates);

        const received = await service.getCoordinates();

        expect(received).toEqual(coordinates);
    });

    it("should return null when user does not accept geolocation", async () => {
        const received = await service.getCoordinates();

        expect(received).toEqual(null);
    });
});

function mockGeolocationApi(coordinates?: Nullable<LocationCoordinates>) {
    Object.defineProperty(window.navigator, "geolocation", {
        value: {
            getCurrentPosition: jest.fn((success: (c: Coordinates) => void, callback: (any: any) => void) => {
                if (coordinates) {
                    return success(({ coords: coordinates } as unknown) as Coordinates);
                }

                return callback(null);
            })
        },
        writable: true
    });
}
