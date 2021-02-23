import {
  Location,
  LocationCoordinates,
} from "@/location/models/location.model";

export interface LocationSearchService {
  findByCoordinates(
    coordinates: LocationCoordinates,
    opt: { locale: string }
  ): Promise<Location | null>;

  search(query: string, opt: { locale: string }): Promise<Location[]>;
}

export const LocationSearchServiceToken = Symbol();
