"use strict";

import { isEqual } from "lodash";
import { FavoriteLocation, FavoriteLocationsService } from "@/business/favorite-locations/FavoriteLocationsService";
import { City } from "@/business/city-search/CitySearchService";
import { inject } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { StorageService } from "@/core/storage/StorageService";
import { Nullable } from "@/types/app";

export const FAVORITE_CITIES_STORAGE_KEY = "favoriteCities";

export class StoredFavoriteLocationService implements FavoriteLocationsService {
    constructor(@inject(DIToken.STORAGE_SERVICE) private storageService: StorageService) {}

    get locations(): FavoriteLocation[] {
        return this.storageService.get<FavoriteLocation[]>(FAVORITE_CITIES_STORAGE_KEY) || [];
    }

    add(city: City): void {
        if (this.locationIsAlreadyStored(city, this.locations)) {
            return;
        }

        const storedLocations =
            this.storageService.get<Nullable<FavoriteLocation[]>>(FAVORITE_CITIES_STORAGE_KEY) || [];
        this.storageService.set<FavoriteLocation[]>(FAVORITE_CITIES_STORAGE_KEY, [...storedLocations, city]);
    }

    remove(city: City): void {
        const filteredLocations = this.locations.filter(l => !isEqual(city.coordinates, l.coordinates));
        this.storageService.set<FavoriteLocation[]>(FAVORITE_CITIES_STORAGE_KEY, filteredLocations);
    }

    private locationIsAlreadyStored(city: City, favorites: FavoriteLocation[]) {
        return favorites.find(f => isEqual(f.coordinates, city.coordinates));
    }
}
