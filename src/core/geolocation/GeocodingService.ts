"use strict";

import { Coordinates } from "@/core/geolocation/GeolocationService";

export interface GeocodingService {
  getAddress(coordinates: Coordinates): Promise<any>;
}
