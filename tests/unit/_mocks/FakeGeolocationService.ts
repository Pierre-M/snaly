"use strict";

import { GeolocationService, UserCoordinates } from "@/business/geolocation/GeolocationService";

export class FakeGeolocationService implements GeolocationService {
    private returnedValue: UserCoordinates = { latitude: 0, longitude: 0 };

    getCoordinates = jest.fn(() => Promise.resolve(this.returnedValue));

    setReturnedValue(coordinates: UserCoordinates) {
        this.returnedValue = coordinates;
    }
}
