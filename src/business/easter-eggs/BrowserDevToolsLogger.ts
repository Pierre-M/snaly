"use strict";

import { DevToolsLogger } from "@/business/easter-eggs/DevToolsLogger";
import { injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class BrowserDevToolsLogger implements DevToolsLogger {
    displayWelcomeMessage(): void {
        if (process.env.NODE_ENV !== "production") {
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
