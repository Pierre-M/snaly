import "reflect-metadata";
import "@/core/dependency-injection";

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { store } from "./store/store";
import { I18nPlugin as i18n } from "@/ui/core/vue-plugins/I18nPlugin";

import "@/assets/styles/index.css";

import "@/ui/core/vue-filters";
import "@/ui/core/vue-plugins";
import "@/ui/core/vue-directives";

Vue.config.productionTip = false;

new Vue({
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
