"use strict";

import { DevToolsLogger } from "@/business/easter-eggs/DevToolsLogger";
import { inject, injectable, singleton } from "tsyringe";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { EnvironmentService } from "@/core/env/EnvironmentService";

@injectable()
@singleton()
export class BrowserDevToolsLogger implements DevToolsLogger {
    constructor(@inject(DIToken.ENVIRONMENT_SERVICE) private envService: EnvironmentService) {}

    displayWelcomeMessage(): void {
        if (this.envService.isDevelopment) {
            return;
        }

        // eslint-disable-next-line no-console
        console.log(
            "_____/\\\\\\\\\\\\\\\\\\\\\\_________________________________/\\\\\\\\\\\\__________________        \n" +
                " ___/\\\\\\/////////\\\\\\______________________________\\////\\\\\\__________________       \n" +
                "  __\\//\\\\\\______\\///__________________________________\\/\\\\\\_______/\\\\\\__/\\\\\\_      \n" +
                "   ___\\////\\\\\\__________/\\\\/\\\\\\\\\\\\____/\\\\\\\\\\\\\\\\\\_______\\/\\\\\\______\\//\\\\\\/\\\\\\__     \n" +
                "    ______\\////\\\\\\______\\/\\\\\\////\\\\\\__\\////////\\\\\\______\\/\\\\\\_______\\//\\\\\\\\\\___    \n" +
                "     _________\\////\\\\\\___\\/\\\\\\__\\//\\\\\\___/\\\\\\\\\\\\\\\\\\\\_____\\/\\\\\\________\\//\\\\\\____   \n" +
                "      __/\\\\\\______\\//\\\\\\__\\/\\\\\\___\\/\\\\\\__/\\\\\\/////\\\\\\_____\\/\\\\\\_____/\\\\_/\\\\\\_____  \n" +
                "       _\\///\\\\\\\\\\\\\\\\\\\\\\/___\\/\\\\\\___\\/\\\\\\_\\//\\\\\\\\\\\\\\\\/\\\\__/\\\\\\\\\\\\\\\\\\_\\//\\\\\\\\/______ \n" +
                "        ___\\///////////_____\\///____\\///___\\////////\\//__\\/////////___\\////________"
        );
        // eslint-disable-next-line no-console
        console.log(`
        Welcome to Snaly !
        If you want to know more about this project, feel free to check it on github : https://github.com/Pierre-M/snaly
        `);
    }
}
