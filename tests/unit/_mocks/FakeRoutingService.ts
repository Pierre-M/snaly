"use strict";

import { RoutingService, UrlParameters } from "@/core/routing/RoutingService";
import { Nullable } from "@/types/app";

export class FakeRoutingService implements RoutingService {
    returnedValue: Nullable<UrlParameters> = null;

    hasUrlParameter(key: string): boolean {
        return false;
    }

    getUrlParams = jest.fn(() => this.returnedValue);

    setUrlParams = jest.fn();
}
