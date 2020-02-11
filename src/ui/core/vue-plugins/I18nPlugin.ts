"use strict";

import Vue from "vue";
import VueI18n from "vue-i18n";
import { messages } from "@/core/i18n/messages";
import { container } from "tsyringe";
import { EnvironmentService } from "@/core/env/EnvironmentService";
import { DIToken } from "@/core/dependency-injection/DIToken";

Vue.use(VueI18n);

const envService = container.resolve<EnvironmentService>(DIToken.ENVIRONMENT_SERVICE);

export const I18nPlugin = new VueI18n({
    locale: "en",
    fallbackLocale: "en",
    silentFallbackWarn: envService.isProduction,
    messages
});

export const I18nService = new Vue({
    i18n: I18nPlugin
});
