"use strict";

import Vue from "vue";
import VueI18n from "vue-i18n";
import { messages } from "@/core/i18n/messages";

Vue.use(VueI18n);

export const I18nPlugin = new VueI18n({
    locale: "en",
    messages
});
