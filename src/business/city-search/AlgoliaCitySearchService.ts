"use strict";

import {
    City,
    CityBuilder,
    CitySearchService,
    CitySearchServiceRequest
} from "@/business/city-search/CitySearchService";
import { inject } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HttpClient } from "@/core/http/HttpClient";

export const ALGOLIA_API = "https://places-dsn.algolia.net/1/places/query";
export const ALGOLIA_BASE_REQUEST = {
    type: "city",
    hitsPerPage: 10
};

export class AlgoliaCitySearchService implements CitySearchService {
    constructor(
        @inject(DIToken.HTTP_CLIENT) private httpClient: HttpClient,
        @inject(DIToken.CITY_BUILDER) private cityBuilder: CityBuilder
    ) {}

    async getCities(request: CitySearchServiceRequest): Promise<City[]> {
        const [response] = await this.httpClient.post<any>(ALGOLIA_API, {
            ...ALGOLIA_BASE_REQUEST,
            ...request
        });

        if (!response) {
            return [];
        }

        return response.hits.map((hit: any) => this.cityBuilder.build(hit)).filter(Boolean);
    }
}
