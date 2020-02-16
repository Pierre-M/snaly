"use strict";

import { City } from "@/business/city-search/CitySearchService";
import { ContextualImage } from "@/core/image/ContextualImageService";

export interface FavoriteLocation extends City {
    img?: ContextualImage;
}

export interface FavoriteLocationsService {
    locations: FavoriteLocation[];

    add(city: City): void;
    remove(city: City): void;
}
