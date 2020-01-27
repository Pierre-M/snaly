"use strict";

import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import { Nullable } from "@/types/app";

export interface Address {
    city: string;
    country: string;
    countryCode: string;
    zipCode: string;
}

export interface GeocodingService {
    getAddress(coordinates: UserCoordinates): Promise<Nullable<Address>>;
}
