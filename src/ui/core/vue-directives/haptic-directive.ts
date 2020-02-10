"use strict";

import Vue from "vue";
import { container } from "tsyringe";
import { HapticFeedbackService } from "@/core/hardware/HapticFeedbackService";
import { DIToken } from "@/core/dependency-injection/DIToken";

const hapticService = container.resolve<HapticFeedbackService>(DIToken.HAPTIC_FEEDBACK_SERVICE);

Vue.directive("haptic", {
    inserted(el) {
        el.addEventListener("click", hapticService.vibrate);
    },
    unbind(el) {
        el.removeEventListener("click", hapticService.vibrate);
    }
});
