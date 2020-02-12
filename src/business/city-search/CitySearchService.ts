"use strict";

import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export interface City {
    name: string;
    country: string;
    countryCode: string;
    zipCode: string;
    coordinates: UserCoordinates;
}

export interface CitySearchServiceRequest {
    query: string;
    language: string;
}

export interface CityBuilder {
    build(data: any): Nullable<City>;
}

export interface CitySearchService {
    getCities(request: CitySearchServiceRequest): Promise<City[]>;
}
