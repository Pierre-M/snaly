import Vue from "vue";

import "reflect-metadata";
import "./_mocks";

import VueScrollLock from "v-scroll-lock";
import VClickOutisde from "v-click-outside";
import VHotKey from "v-hotkey";
import Transitions from "vue2-transitions";
import PortalVue from "portal-vue";

Vue.use(Transitions);
Vue.use(VueScrollLock);
Vue.use(VClickOutisde);
Vue.use(VHotKey);
Vue.use(PortalVue);

import "@/ui/core/vue-directives";
