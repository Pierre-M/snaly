"use strict";

import Shake from "shake.js";
import { GestureService } from "@/core/hardware/GestureService";
import { inject, injectable } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { HapticFeedbackService } from "@/core/hardware/HapticFeedbackService";

@injectable()
export class MobileGestureService implements GestureService {
    private shakeDetector: typeof Shake;

    constructor(
        @inject(DIToken.HAPTIC_FEEDBACK_SERVICE)
        private hapticFeedBackService: HapticFeedbackService
    ) {
        this.setUpShakeHapticFeedback();
        this.setUpShakeDetector();
    }

    get canHandleShake(): boolean {
        return !!window.DeviceMotionEvent;
    }

    onShake(shakeHandler: () => void): void {
        window.addEventListener("shake", shakeHandler);
    }

    private setUpShakeDetector() {
        this.shakeDetector = new Shake({
            threshold: 15,
            timeout: 1000
        });

        this.shakeDetector.start();
    }

    private setUpShakeHapticFeedback() {
        window.addEventListener("shake", this.hapticFeedBackService.vibrate);
    }
}
