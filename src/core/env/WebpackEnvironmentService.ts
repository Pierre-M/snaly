"use strict";

import { Environment, EnvironmentService } from "@/core/env/EnvironmentService";
import { injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class WebpackEnvironmentService implements EnvironmentService {
    get isProduction(): boolean {
        return process.env.NODE_ENV === Environment.PROD;
    }

    get isDevelopment(): boolean {
        return process.env.NODE_ENV === Environment.DEV;
    }

    setEnv(env: Environment): void {
        Object.defineProperty(process.env, "NODE_ENV", {
            value: env,
            writable: true
        });
    }
}
