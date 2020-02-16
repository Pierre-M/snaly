"use strict";

export interface I18nService {
    t(key: string, ...args: any[]): string;
}
