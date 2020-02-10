"use strict";

import * as Sentry from "@sentry/browser";
jest.mock("@sentry/browser");

import { SentryAlertingService } from "@/core/alerting/SentryAlertingService";

const FAKE_SENTRY_DSN = "fake_sentry_dsn";

describe("SentryAlertingService", () => {
    it("should not init Sentry integration in dev environment", () => {
        process.env.NODE_ENV = "development";

        new SentryAlertingService({ dsn: FAKE_SENTRY_DSN });

        expect(Sentry.init).not.toHaveBeenCalled();
    });

    it("should init Sentry integration in production environment", () => {
        process.env.NODE_ENV = "production";

        new SentryAlertingService({ dsn: FAKE_SENTRY_DSN });

        expect(Sentry.init).toHaveBeenCalledWith({
            dsn: FAKE_SENTRY_DSN,
            integrations: expect.any(Array)
        });
    });

    it("should not call for Sentry captureException method in dev environment", () => {
        process.env.NODE_ENV = "development";

        const service = new SentryAlertingService({ dsn: "fake-dsn" });

        service.logError("test");

        expect(Sentry.captureException).not.toHaveBeenCalled();
    });

    it("should call for Sentry captureException method in production environment with the right payload", () => {
        process.env.NODE_ENV = "production";

        const service = new SentryAlertingService({ dsn: "fake-dsn" });

        service.logError("test");

        expect(Sentry.captureException).toHaveBeenCalledWith("test");
    });
});
