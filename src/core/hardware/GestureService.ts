"use strict";

export interface AvailableGestures {
    shake: boolean;
}

export interface GestureService {
    canHandleShake: boolean;
    onShake(shakeHandler: () => void): void;
}
