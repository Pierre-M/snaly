"use strict";

import { BrowserRoutingService } from "@/core/routing/BrowserRoutingService";

let service: BrowserRoutingService;
const originalLocation = window.location;

describe("BrowserRoutingService", () => {
    beforeEach(() => {
        service = new BrowserRoutingService();
    });

    afterEach(() => {
        resetLocationObject();
    });

    it("should return null upon call on getUrlParams in current url does not have any paramaters", () => {
        modifyCurrentLocationParameters();
        expect(service.getUrlParams()).toBe(null);
    });

    it("should return right paramters upon call on getUrlParams in current url have any parameters", () => {
        modifyCurrentLocationParameters("tag=1&tag=2&foo=bar");
        expect(service.getUrlParams()).toEqual({ tag: ["1", "2"], foo: "bar" });
    });

    it("should modify current url upon call on setUrlParams", () => {
        service.setUrlParams({ foo: "bar" });
        expect(window.location.search).toBe("?foo=bar");
    });

    it("should be able to tell if a parameter is in current url", () => {
        modifyCurrentLocationParameters();
        expect(service.hasUrlParameter("foo")).toBe(false);

        modifyCurrentLocationParameters("foo=bar");
        expect(service.hasUrlParameter("foo")).toBe(true);
    });
});

function modifyCurrentLocationParameters(stringParams?: string) {
    Object.defineProperty(window, "location", {
        value: { search: stringParams ? `?${stringParams}` : "" },
        writable: true
    });
}

function resetLocationObject() {
    Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true
    });
}
