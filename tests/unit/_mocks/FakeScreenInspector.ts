"use strict";

import { ScreenInspector, ScreenOrientation } from "@/core/browser/ScreenInspector";

export class FakeScreenInspector implements ScreenInspector {
    size = {
        width: 0,
        height: 0
    };

    dpr = 0;

    orientation = ScreenOrientation.PORTRAIT;

    hasTouchSupport = false;
}
