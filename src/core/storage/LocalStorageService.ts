"use strict";

import { StorageService } from "@/core/storage/StorageService";
import { Nullable } from "@/types/app";

export class LocalStorageService implements StorageService {
    get<T>(key: string): Nullable<T> {
        const rawValue: Nullable<string> = localStorage.getItem(key);

        if (!rawValue) {
            return null;
        }

        return JSON.parse(rawValue) as T;
    }

    set<T>(key: string, value: T): Nullable<T> {
        localStorage.setItem(key, JSON.stringify(value) as string);
        return this.get<T>(key);
    }

    clear() {
        localStorage.clear();
    }
}
