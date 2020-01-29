"use strict";

import {
    MobileHapticFeedBackService,
    VIBRATE_FEEDBACK_DURATION_IN_MS
} from "@/core/hardware/MobileHapticFeedBackService";

let service: MobileHapticFeedBackService;

describe("MobileHapticFeedbackService", () => {
    beforeEach(() => {
        Object.defineProperty(window.navigator, "vibrate", {
            value: jest.fn()
        });

        service = new MobileHapticFeedBackService();
    });

    it("should use right api upon vibrate call", () => {
        service.vibrate();
        expect(window.navigator.vibrate).toHaveBeenCalledWith(VIBRATE_FEEDBACK_DURATION_IN_MS);
    });
});
