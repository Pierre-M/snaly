import { LocationCoordinates } from "@/location/models/location.model";

export interface GeolocationService {
    getPosition(): Promise<LocationCoordinates | null>;
}

export const GeolocationServiceToken = Symbol();
