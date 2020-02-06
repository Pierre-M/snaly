import "reflect-metadata";
import "@/core/dependency-injection";

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { store } from "./store/store";

import "@/assets/styles/index.css";

import "@/ui/core/vue-filters";
import "@/ui/core/vue-plugins";

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
