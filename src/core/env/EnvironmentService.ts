"use strict";

export enum Environment {
    DEV = "development",
    PROD = "production"
}

export interface EnvironmentService {
    isProduction: boolean;
    isDevelopment: boolean;
    setEnv(env: Environment): void;
}
