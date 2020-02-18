"use strict";

import { Location, LocationBuilder } from "@/business/location-search/LocationSearchService";
import { Nullable } from "@/types/app";

export class FakeCityBuilder implements LocationBuilder {
    set result(value: Location | null) {
        this._result = value;
    }

    private _result: Nullable<Location> = {} as Location;

    build(data: any): Nullable<Location> {
        return this._result;
    }
}
