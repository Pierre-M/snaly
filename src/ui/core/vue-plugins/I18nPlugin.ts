"use strict";

import Vue from "vue";
import VueI18n from "vue-i18n";
import { messages } from "@/core/i18n/messages";
import { inject, singleton } from "tsyringe";
import { EnvironmentService } from "@/core/env/EnvironmentService";
import { DIToken } from "@/core/dependency-injection/DIToken";
import { I18nService } from "@/core/i18n/I18nService";

Vue.use(VueI18n);

@singleton()
export class VueI18nService implements I18nService {
    get i18nPlugin(): VueI18n {
        return this._i18nPlugin;
    }

    constructor(@inject(DIToken.ENVIRONMENT_SERVICE) private envService: EnvironmentService) {}

    private _i18nPlugin: VueI18n = new VueI18n({
        locale: "en",
        fallbackLocale: "en",
        silentFallbackWarn: this.envService.isProduction,
        messages
    });

    private vueInstance: Vue = new Vue({
        i18n: this._i18nPlugin
    });

    t(key: string, ...args: any[]): string {
        return this.vueInstance.$t(key, args) as string;
    }
}
