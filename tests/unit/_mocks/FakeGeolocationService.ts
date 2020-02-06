"use strict";

import { GeolocationService, UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export class FakeGeolocationService implements GeolocationService {
    private returnedValue: Nullable<UserCoordinates> = { latitude: 0, longitude: 0 };

    getCoordinates = jest.fn(() => Promise.resolve(this.returnedValue));

    setReturnedValue(coordinates: Nullable<UserCoordinates>) {
        this.returnedValue = coordinates;
    }
}
