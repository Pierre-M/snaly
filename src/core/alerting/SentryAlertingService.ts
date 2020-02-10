"use strict";

import Vue from "vue";
import { init, captureException } from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { AlertingService } from "@/core/alerting/AlertingService";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { EnvironmentService } from "@/core/env/EnvironmentService";

export const SENTRY_DSN = "https://42a6efd91fa44e1eaf44876786551343@sentry.io/2406629";

@injectable()
@singleton()
export class SentryAlertingService implements AlertingService {
    private readonly dsn: string = SENTRY_DSN;

    constructor(@inject(DIToken.ENVIRONMENT_SERVICE) private envService: EnvironmentService) {
        if (!this.envService.isProduction) return;

        init({
            dsn: this.dsn,
            integrations: [new VueIntegration({ Vue, logErrors: true })]
        });
    }

    logError(error: any) {
        if (process.env.NODE_ENV !== "production") return;

        captureException(error);
    }
}
