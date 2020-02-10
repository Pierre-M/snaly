"use strict";

import { BrowserSharingService } from "@/core/browser/BrowserSharingService";
import { ShareRequest } from "@/core/browser/SharingService";

let service: BrowserSharingService;

describe("BrowserSharingService", () => {
    beforeEach(() => {
        service = new BrowserSharingService();
        enableShareFeature();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return false if 'share' feature is not available", () => {
        disableShareFeature();

        expect(service.canShare).toBe(false);
    });

    it("should return true if 'share' feature is available", () => {
        expect(service.canShare).toBe(true);
    });

    it("should call for share method if share feature is available", () => {
        const fakeShareRequest: ShareRequest = {
            url: "snaly.com",
            title: "Snaly",
            text: "Love"
        };

        service.share(fakeShareRequest);

        // @ts-ignore
        expect(window.navigator.share).toHaveBeenCalledWith(fakeShareRequest);
    });
});

function enableShareFeature() {
    Object.defineProperty(window.navigator, "share", {
        value: jest.fn(() => Promise.resolve()),
        writable: true
    });
}

function disableShareFeature() {
    Object.defineProperty(window.navigator, "share", {
        value: null,
        writable: true
    });
}
