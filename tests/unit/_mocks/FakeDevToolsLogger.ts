"use strict";

import { DevToolsLogger } from "@/business/easter-eggs/DevToolsLogger";

export class FakeDevToolsLogger implements DevToolsLogger {
    displayWelcomeMessage = jest.fn();
}
