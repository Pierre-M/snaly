"use strict";

import { City, CitySearchService } from "@/business/city-search/CitySearchService";

export class FakeCitySearchService implements CitySearchService {
    set results(value: City[]) {
        this._results = value;
    }

    private _results: City[] = [];

    getCities = jest.fn(() => Promise.resolve(this._results));
}
