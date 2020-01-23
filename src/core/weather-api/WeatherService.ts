"use strict";

import { Coordinates } from "@/core/geolocation/GeolocationService";

export interface WeatherService {
  getByCoordinates(coordinates: Coordinates): Promise<any>;
}
