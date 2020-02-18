"use strict";

import { LocationCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export interface Location {
    name: string;
    country: string;
    countryCode: string;
    zipCode: string;
    coordinates: LocationCoordinates;
}

export interface LocationSearchServiceRequest {
    query: string;
    language: string;
}

export interface LocationSearchGeocodingRequest {
    coordinates: LocationCoordinates;
    language: string;
}

export interface LocationBuilder {
    build(data: any): Nullable<Location>;
}

export interface LocationSearchService {
    getLocationByCoordinates(request: LocationSearchGeocodingRequest): Promise<Nullable<Location>>;
    getLocations(request: LocationSearchServiceRequest): Promise<Location[]>;
}
