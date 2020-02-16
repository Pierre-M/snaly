"use strict";

import { I18nService } from "@/core/i18n/I18nService";

export class FakeI18nService implements I18nService {
    t(key: string, ...args: any[]): string {
        return key;
    }
}
