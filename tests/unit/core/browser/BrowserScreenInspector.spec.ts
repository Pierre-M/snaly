"use strict";

import { BrowserScreenInspector } from "@/core/browser/BrowserScreenInspector";
import { ScreenOrientation } from "@/core/browser/ScreenInspector";
import { Nullable } from "@/types/app";

let inspector: BrowserScreenInspector;

describe("BrowserScreenInspector", () => {
    beforeEach(() => {
        inspector = new BrowserScreenInspector();
    });

    it("should return right screen orientation if available", () => {
        setScreenOrientation("portrait");
        expect(inspector.orientation).toEqual(ScreenOrientation.PORTRAIT);
    });

    it("should return right screen size", () => {
        const size = { width: 1280, height: 768 };
        setScreenSize(size);
        expect(inspector.size).toEqual(size);
    });

    it("should return right screen dpr", () => {
        setDevicePixelRatio(2.333333);
        expect(inspector.dpr).toEqual(3);
    });

    it("should orientation based on screen size if native orientation is not available", () => {
        setScreenOrientation(null);
        setScreenSize({ width: 1000, height: 500 });
        expect(inspector.orientation).toEqual(ScreenOrientation.LANDSCAPE);
    });
});

function setDevicePixelRatio(ratio: number) {
    Object.defineProperty(window, "devicePixelRatio", {
        value: ratio
    });
}

function setScreenSize(params: { width: number; height: number }) {
    Object.defineProperty(window, "innerWidth", {
        value: params.width
    });

    Object.defineProperty(window, "innerHeight", {
        value: params.height
    });
}

function setScreenOrientation(orientation: Nullable<string>) {
    Object.defineProperty(window.screen, "orientation", {
        value: {
            type: [orientation]
        },
        writable: true
    });
}
