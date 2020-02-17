"use strict";

import { FavoriteLocation, FavoriteLocationsService } from "@/business/favorite-locations/FavoriteLocationsService";

export class FakeFavoriteLocationsService implements FavoriteLocationsService {
    set returnedValue(value: FavoriteLocation[]) {
        this._returnedValue = value;
    }

    private _returnedValue: FavoriteLocation[] = [];

    get locations(): FavoriteLocation[] {
        return this._returnedValue;
    }

    add = jest.fn();
    remove = jest.fn();
}
