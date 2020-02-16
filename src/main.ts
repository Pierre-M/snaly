import "reflect-metadata";
import "@/core/dependency-injection";

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { store } from "./store/store";

import "@/assets/styles/index.css";

import "@/ui/core/vue-filters";
import "@/ui/core/vue-plugins";
import "@/ui/core/vue-directives";
import { container } from "tsyringe";
import { VueI18nService } from "@/ui/core/vue-plugins/I18nPlugin";
import { DIToken } from "@/core/dependency-injection/DIToken";

const i18nService = container.resolve<VueI18nService>(DIToken.I18N_SERVICE);

Vue.config.productionTip = false;

new Vue({
    store,
    i18n: i18nService.i18nPlugin,
    render: h => h(App)
}).$mount("#app");
