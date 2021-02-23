import { LocationSearchService } from "@/location-search/models/location-search.model";
import HttpClient, { ApiResponse } from "@/core/http/HttpClient";
import {
  Location,
  LocationCoordinates,
} from "@/location/models/location.model";

export default class AlgoliaLocationSearchService
  implements LocationSearchService {
  constructor(private httpClient: HttpClient) {}

  private algoliaGeocodingApi =
    "https://places-dsn.algolia.net/1/places/reverse";
  private algoliaSearchApi = "https://places-dsn.algolia.net/1/places/query";

  async findByCoordinates(
    coordinates: LocationCoordinates,
    { locale }: { locale: string }
  ): Promise<Location | null> {
    try {
      const { data } = await this.httpClient.get(this.algoliaGeocodingApi, {
        hitsPerPage: 1,
        language: locale,
        aroundLatLng: `${coordinates.lat},${coordinates.lng}`,
      });

      if (!data) return null;

      return AlgoliaLocationSearchService.toLocation(data.hits[0]);
    } catch {
      return null;
    }
  }

  async search(
    query: string,
    { locale }: { locale: string }
  ): Promise<Location[]> {
    try {
      const { data } = await this.httpClient.post(this.algoliaSearchApi, {
        type: "city",
        hitsPerPage: 10,
        query,
        language: locale,
      });

      if (!data) return [];

      return data.hits
        .map((hit: ApiResponse) => AlgoliaLocationSearchService.toLocation(hit))
        .filter(Boolean)
        .reduce((locations: Location[], location: Location) => {
          const isDoubled = !!locations.find((c) => {
            return (
              c.formatted === location.formatted &&
              c.countryCode === location.countryCode
            );
          });

          if (isDoubled) {
            return locations;
          }

          return [...locations, location];
        }, []);
    } catch {
      return [];
    }
  }

  private static toLocation(item: ApiResponse): Location {
    return {
      lat: item._geoloc.lat,
      lng: item._geoloc.lng,
      formatted: item.city ? item.city[0] : item.locale_names[0],
      countryCode: item.country_code,
      zipCode: item.postcode ? item.postcode[0] : "",
    };
  }
}
