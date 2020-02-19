"use strict";

import { parse, stringify } from "querystring";
import { RoutingService, UrlParameters } from "@/core/routing/RoutingService";
import { Nullable } from "@/types/app";

export class BrowserRoutingService implements RoutingService {
    getUrlParams(): Nullable<UrlParameters> {
        const paramAsString = window.location.search.substring(1);

        if (!paramAsString) return null;

        return parse(paramAsString);
    }

    setUrlParams(params: UrlParameters): void {
        const stringifiedParams = stringify(params);

        window.history.pushState("", "", `?${stringifiedParams}`);
    }

    hasUrlParameter(key: string): boolean {
        const params = this.getUrlParams();

        if (!params) return false;

        return key in params;
    }
}
