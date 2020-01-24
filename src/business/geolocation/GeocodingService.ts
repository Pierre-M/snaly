"use strict";

import { Coordinates } from "@/business/geolocation/GeolocationService";

export interface GeocodingService {
    getAddress(coordinates: Coordinates): Promise<any>;
}
