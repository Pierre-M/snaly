"use strict";

import { City, CitySearchService } from "@/business/city-search/CitySearchService";
import { Nullable } from "@/types/app";

export class FakeCitySearchService implements CitySearchService {
    set city(value: City | null) {
        this._city = value;
    }
    set results(value: City[]) {
        this._results = value;
    }

    private _results: City[] = [];
    private _city: Nullable<City> = null;

    getCityByCoordinates = jest.fn(() => Promise.resolve(this._city));
    getCities = jest.fn(() => Promise.resolve(this._results));
}
