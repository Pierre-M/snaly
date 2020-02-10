"use strict";

import { WebpackEnvironmentService } from "@/core/env/WebpackEnvironmentService";
import { Environment } from "@/core/env/EnvironmentService";

let service: WebpackEnvironmentService;

describe("WebpackEnvironmentService", () => {
    beforeEach(() => {
        service = new WebpackEnvironmentService();
    });

    it("should return right value for isProduction if environment is not production", () => {
        process.env.NODE_ENV = "test";

        expect(service.isProduction).toBe(false);
    });

    it("should return right value for isProduction if environment is production", () => {
        process.env.NODE_ENV = "production";

        expect(service.isProduction).toBe(true);
    });

    it("should return right value for isDevelopment if environment is not development", () => {
        process.env.NODE_ENV = "test";

        expect(service.isDevelopment).toBe(false);
    });

    it("should return right value for isDevelopment if environment is development", () => {
        process.env.NODE_ENV = "development";

        expect(service.isDevelopment).toBe(true);
    });

    it("should be able to change environment value", () => {
        service.setEnv(Environment.DEV);

        expect(service.isDevelopment).toBe(true);
        expect(service.isProduction).toBe(false);

        service.setEnv(Environment.PROD);

        expect(service.isDevelopment).toBe(false);
        expect(service.isProduction).toBe(true);
    });
});
