"use strict";

import { GeolocationService, LocationCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export class FakeGeolocationService implements GeolocationService {
    private returnedValue: Nullable<LocationCoordinates> = { latitude: 0, longitude: 0 };

    getCoordinates = jest.fn(() => Promise.resolve(this.returnedValue));

    setReturnedValue(coordinates: Nullable<LocationCoordinates>) {
        this.returnedValue = coordinates;
    }
}
