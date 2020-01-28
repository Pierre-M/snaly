"use strict";

import Shake from "shake.js";
import { GestureService } from "@/core/hardware/GestureService";

export class MobileGestureService implements GestureService {
    private shakeDetector: typeof Shake;

    constructor() {
        this.shakeDetector = new Shake({
            threshold: 15,
            timeout: 1000
        });
    }

    get canHandleShake(): boolean {
        return !!window.DeviceMotionEvent;
    }

    onShake(shakeHandler: () => void): void {
        window.addEventListener("shake", shakeHandler);
    }
}
