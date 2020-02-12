"use strict";

import { City, CityBuilder } from "@/business/city-search/CitySearchService";
import { Nullable } from "@/types/app";

export class FakeCityBuilder implements CityBuilder {
    build(data: any): Nullable<City> {
        return {} as City;
    }
}
