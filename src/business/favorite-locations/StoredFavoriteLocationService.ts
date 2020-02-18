"use strict";

import { FavoriteLocation, FavoriteLocationsService } from "@/business/favorite-locations/FavoriteLocationsService";
import { Location } from "@/business/location-search/LocationSearchService";
import { inject, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { StorageService } from "@/core/storage/StorageService";
import { Nullable } from "@/types/app";

export const FAVORITE_CITIES_STORAGE_KEY = "favoriteCities";

@singleton()
export class StoredFavoriteLocationService implements FavoriteLocationsService {
    constructor(@inject(DIToken.STORAGE_SERVICE) private storageService: StorageService) {}

    get locations(): FavoriteLocation[] {
        return this.storageService.get<FavoriteLocation[]>(FAVORITE_CITIES_STORAGE_KEY) || [];
    }

    add(city: Location): void {
        if (this.locationIsAlreadyStored(city, this.locations)) {
            return;
        }

        const storedLocations =
            this.storageService.get<Nullable<FavoriteLocation[]>>(FAVORITE_CITIES_STORAGE_KEY) || [];
        this.storageService.set<FavoriteLocation[]>(FAVORITE_CITIES_STORAGE_KEY, [...storedLocations, city]);
    }

    remove(city: Location): void {
        const filteredLocations = this.locations.filter(l => l.name !== city.name);
        this.storageService.set<FavoriteLocation[]>(FAVORITE_CITIES_STORAGE_KEY, filteredLocations);
    }

    private locationIsAlreadyStored(city: Location, favorites: FavoriteLocation[]): boolean {
        return !!favorites.find(f => f.name === city.name);
    }
}
