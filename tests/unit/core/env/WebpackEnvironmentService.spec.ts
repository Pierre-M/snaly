"use strict";

import { WebpackEnvironmentService } from "@/core/env/WebpackEnvironmentService";

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
});
