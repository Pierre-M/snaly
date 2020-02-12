"use strict";

import { City, CityBuilder } from "@/business/city-search/CitySearchService";
import { Nullable } from "@/types/app";

export class FakeCityBuilder implements CityBuilder {
    set result(value: City | null) {
        this._result = value;
    }

    private _result: Nullable<City> = {} as City;

    build(data: any): Nullable<City> {
        return this._result;
    }
}
