"use strict";

import Vue from "vue";
import { bus, Events } from "@/ui/core/events";

declare module "vue/types/vue" {
    interface Vue {
        $bus: {
            $emit(event: Events, payload?: any): void;
            $on(event: Events, cb: (payload?: any) => void): void;
        };
        $events: Events;
    }
}

export const EventsPlugin = {
    install(_Vue: typeof Vue) {
        _Vue.prototype.$bus = bus;
        _Vue.prototype.$events = Events;
    }
};
