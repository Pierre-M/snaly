"use strict";

import { GestureService } from "@/core/hardware/GestureService";

export class FakeGestureService implements GestureService {
    canHandleShake = false;
    onShake(shakeHandler: () => void): void {}
}
