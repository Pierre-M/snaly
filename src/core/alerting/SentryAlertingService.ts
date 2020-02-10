"use strict";

import Vue from "vue";
import { init, captureException } from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { AlertingService } from "@/core/alerting/AlertingService";
import { injectable, singleton } from "tsyringe";

interface SentryAlertingServiceParams {
    dsn: string;
}

export const SENTRY_DSN = "https://42a6efd91fa44e1eaf44876786551343@sentry.io/2406629";

@injectable()
@singleton()
export class SentryAlertingService implements AlertingService {
    private readonly dsn: string;

    constructor(params: SentryAlertingServiceParams) {
        this.dsn = params.dsn;

        if (process.env.NODE_ENV !== "production") return;

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
