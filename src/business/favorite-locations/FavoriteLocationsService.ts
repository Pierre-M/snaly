"use strict";

import { City } from "@/business/city-search/CitySearchService";
import { ContextualImage } from "@/core/image/ContextualImageService";

export interface FavoriteCity extends City {
    img?: ContextualImage;
}

export interface FavoriteLocationsService {
    locations: FavoriteCity[];

    add(city: City): void;
    remove(city: City): void;
}
