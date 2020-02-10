"use strict";

import { AlertingService } from "@/core/alerting/AlertingService";

export class FakeAlertingService implements AlertingService {
    logError = jest.fn();
}
