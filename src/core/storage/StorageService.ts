"use strict";

import { Nullable } from "@/types/app";

export interface StorageService {
    set<T>(key: string, value: any): Nullable<T>;
    get<T>(key: string): Nullable<T>;
    clear(): void;
}
