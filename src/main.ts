import "reflect-metadata";
import "@/core/dependency-injection";

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";

import "@/ui/core/vue-filters";

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
