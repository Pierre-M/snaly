"use strict";

import { HapticFeedbackService } from "@/core/hardware/HapticFeedbackService";
import { injectable, singleton } from "tsyringe";

//export for testing
export const VIBRATE_FEEDBACK_DURATION_IN_MS = 20;

@injectable()
@singleton()
export class MobileHapticFeedBackService implements HapticFeedbackService {
    vibrate() {
        try {
            window.navigator.vibrate(VIBRATE_FEEDBACK_DURATION_IN_MS);
        } catch (err) {
            //
        }
    }
}
