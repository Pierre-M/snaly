"use strict";

import { GeocodingService, UserLocation } from "@/business/geocoding/GeocodingService";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export class FakeGeocodingService implements GeocodingService {
    set returnedValue(value: UserLocation | null) {
        this._returnedValue = value;
    }

    private _returnedValue: Nullable<UserLocation> = null;

    getAddress = jest.fn((coordinates: UserCoordinates) => Promise.resolve(this._returnedValue));
}
