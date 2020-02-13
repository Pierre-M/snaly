"use strict";

import {
    City,
    CityBuilder,
    CitySearchGeocodingRequest,
    CitySearchService,
    CitySearchServiceRequest
} from "@/business/city-search/CitySearchService";
import { inject, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";
import { Nullable } from "@/types/app";

export const ALGOLIA_API = "https://places-dsn.algolia.net/1/places";
export const ALGOLIA_SEARCH_API = `${ALGOLIA_API}/query`;
export const ALGOLIA_REVERSE_GEOCODING_API = `https://places-dsn.algolia.net/1/places/reverse`;
export const ALGOLIA_BASE_REQUEST = {
    type: "city",
    hitsPerPage: 10
};

@singleton()
export class AlgoliaCitySearchService implements CitySearchService {
    constructor(
        @inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient,
        @inject(DIToken.CITY_BUILDER) private cityBuilder: CityBuilder
    ) {}

    async getCityByCoordinates({ coordinates, language }: CitySearchGeocodingRequest): Promise<Nullable<City>> {
        const [res] = await this.httpClient.get<any>(ALGOLIA_REVERSE_GEOCODING_API, {
            hitsPerPage: 1,
            language: language,
            aroundLatLng: `${coordinates.latitude},${coordinates.longitude}`
        });

        if (!res) {
            return null;
        }

        return this.cityBuilder.build(res.hits[0]);
    }

    async getCities(request: CitySearchServiceRequest): Promise<City[]> {
        if (!request.query) {
            return [];
        }

        const [response] = await this.httpClient.post<any>(ALGOLIA_SEARCH_API, {
            ...ALGOLIA_BASE_REQUEST,
            ...request
        });

        if (!response) {
            return [];
        }

        return response.hits
            .map((hit: any) => this.cityBuilder.build(hit))
            .filter(Boolean)
            .reduce((cities: City[], city: City) => {
                const isDoubled = !!cities.find(c => {
                    return c.name === city.name && c.countryCode === city.countryCode;
                });

                if (isDoubled) {
                    return cities;
                }

                return [...cities, city];
            }, []);
    }
}
