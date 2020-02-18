"use strict";

import { Location } from "@/business/location-search/LocationSearchService";
import { ContextualImage } from "@/core/image/ContextualImageService";

export interface FavoriteLocation extends Location {
    img?: ContextualImage;
}

export interface FavoriteLocationsService {
    locations: FavoriteLocation[];

    add(city: Location): void;
    remove(city: Location): void;
}
