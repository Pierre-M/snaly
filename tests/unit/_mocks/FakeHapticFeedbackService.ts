"use strict";

import { HapticFeedbackService } from "@/core/hardware/HapticFeedbackService";

export class FakeHapticFeedbackService implements HapticFeedbackService {
    vibrate = jest.fn();
}
