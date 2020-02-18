"use strict";

import { Location, LocationSearchService } from "@/business/location-search/LocationSearchService";
import { Nullable } from "@/types/app";

export class FakeCitySearchService implements LocationSearchService {
    set city(value: Location | null) {
        this._city = value;
    }
    set results(value: Location[]) {
        this._results = value;
    }

    private _results: Location[] = [];
    private _city: Nullable<Location> = null;

    getLocationByCoordinates = jest.fn(() => Promise.resolve(this._city));
    getLocations = jest.fn(() => Promise.resolve(this._results));
}
