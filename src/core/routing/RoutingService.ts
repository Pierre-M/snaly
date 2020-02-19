"use strict";

import { Nullable } from "@/types/app";

export type UrlParameters = Record<string, any>;

export interface RoutingService {
    getUrlParams(): Nullable<UrlParameters>;
    setUrlParams(params: UrlParameters): void;
    hasUrlParameter(key: string): boolean;
}
