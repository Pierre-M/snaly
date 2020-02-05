"use strict";

import Vue from "vue";
import VueScrollLock from "v-scroll-lock";
import VClickOutisde from "v-click-outside";
import VHotKey from "v-hotkey";
import Transitions from "vue2-transitions";
import PortalVue from "portal-vue";
import { ModalPlugin } from "@/ui/core/vue-plugins/ModalPlugin";

Vue.use(Transitions);
Vue.use(VueScrollLock);
Vue.use(VClickOutisde);
Vue.use(VHotKey);
Vue.use(PortalVue);
Vue.use(ModalPlugin);
