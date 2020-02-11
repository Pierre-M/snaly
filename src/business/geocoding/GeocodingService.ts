"use strict";

import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export interface UserLocation {
    city: string;
    country: string;
    countryCode: string;
    zipCode: string;
}

export interface GeocodingServiceRequest {
    coordinates: UserCoordinates;
    language: string;
}

export interface GeocodingService {
    getAddress(request: GeocodingServiceRequest): Promise<Nullable<UserLocation>>;
}
