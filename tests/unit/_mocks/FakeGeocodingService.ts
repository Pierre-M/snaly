"use strict";

import { GeocodingService, UserLocation } from "@/business/geocoding/GeocodingService";
import { Nullable } from "@/types/app";

export class FakeGeocodingService implements GeocodingService {
    set returnedValue(value: UserLocation | null) {
        this._returnedValue = value;
    }

    private _returnedValue: Nullable<UserLocation> = null;

    getAddress = jest.fn(() => Promise.resolve(this._returnedValue));
}
