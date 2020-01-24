"use strict";

import {
    ScreenInspector,
    ScreenOrientation,
    ScreenSize,
} from "@/core/browser/ScreenInspector";

export class BrowserScreenInspector implements ScreenInspector {
    get orientation(): ScreenOrientation {
        const orientation = window.screen.orientation.type;

        if (orientation.includes("portrait")) {
            return ScreenOrientation.PORTRAIT;
        }

        return ScreenOrientation.LANDSCAPE;
    }

    get size(): ScreenSize {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    get dpr(): number {
        return Math.ceil(window.devicePixelRatio);
    }
}
