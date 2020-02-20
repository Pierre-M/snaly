"use strict";

import {
    MobileHapticFeedBackService,
    VIBRATE_FEEDBACK_DURATION_IN_MS
} from "@/core/hardware/MobileHapticFeedBackService";

let service: MobileHapticFeedBackService;

describe("MobileHapticFeedbackService", () => {
    beforeEach(() => {
        enableVibrate();
        service = new MobileHapticFeedBackService();
    });

    it("should not throw error if vibrate method is not available", () => {
        disableVibrate();

        expect(() => service.vibrate()).not.toThrow();
    });

    it("should use right api upon vibrate call", () => {
        service.vibrate();
        expect(window.navigator.vibrate).toHaveBeenCalledWith(VIBRATE_FEEDBACK_DURATION_IN_MS);
    });
});

function enableVibrate() {
    Object.defineProperty(window.navigator, "vibrate", {
        value: jest.fn(),
        writable: true
    });
}

function disableVibrate() {
    Object.defineProperty(window.navigator, "vibrate", {
        value: null,
        writable: true
    });
}
