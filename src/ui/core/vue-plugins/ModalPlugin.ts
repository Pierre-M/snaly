"use strict";

import Vue from "vue";
import { bus, Events } from "@/ui/core/events";

declare module "vue/types/vue" {
    interface Vue {
        $modal: {
            open: (id: string, data?: any) => void;
            close: (id: string, data?: any) => void;
        };
    }
}

export interface ModalEventPayload {
    id: string;
    data?: any;
}

export const ModalPlugin = {
    install(_Vue: typeof Vue) {
        _Vue.prototype.$modal = {
            open(id: string, data?: any) {
                const payload: ModalEventPayload = { id, data };
                bus.$emit(Events.OPEN_MODAL, payload);
            },

            close(id: string, data?: any) {
                const payload: ModalEventPayload = { id, data };
                bus.$emit(Events.CLOSE_MODAL, payload);
            }
        };
    }
};
