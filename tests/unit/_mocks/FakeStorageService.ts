"use strict";

import { StorageService } from "@/core/storage/StorageService";

export class FakeStorageService implements StorageService {
    set returnedValue(value: any) {
        this._returnedValue = value;
    }

    private _returnedValue: any = null;

    get = jest.fn(() => this._returnedValue);
    set = jest.fn(() => this._returnedValue);
    clear = jest.fn(() => {
        this._returnedValue = null;

        return this._returnedValue;
    });
}
