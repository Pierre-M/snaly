"use strict";

import * as Sentry from "@sentry/browser";
import { SENTRY_DSN, SentryAlertingService } from "@/core/alerting/SentryAlertingService";
import { container } from "tsyringe";
import { Environment, EnvironmentService } from "@/core/env/EnvironmentService";
import { DIToken } from "@/core/dependency-injection/DIToken";

jest.mock("@sentry/browser");

const envService = container.resolve<EnvironmentService>(DIToken.ENVIRONMENT_SERVICE);

describe("SentryAlertingService", () => {
    it("should not init Sentry integration in dev environment", () => {
        process.env.NODE_ENV = Environment.DEV;

        new SentryAlertingService(envService);

        expect(Sentry.init).not.toHaveBeenCalled();
    });

    it("should init Sentry integration in production environment", () => {
        process.env.NODE_ENV = Environment.PROD;

        new SentryAlertingService(envService);

        expect(Sentry.init).toHaveBeenCalledWith({
            dsn: SENTRY_DSN,
            integrations: expect.any(Array)
        });
    });

    it("should not call for Sentry captureException method in dev environment", () => {
        process.env.NODE_ENV = Environment.DEV;

        const service = new SentryAlertingService(envService);

        service.logError("test");

        expect(Sentry.captureException).not.toHaveBeenCalled();
    });

    it("should call for Sentry captureException method in production environment with the right payload", () => {
        process.env.NODE_ENV = Environment.PROD;

        const service = new SentryAlertingService(envService);

        service.logError("test");

        expect(Sentry.captureException).toHaveBeenCalledWith("test");
    });
});
