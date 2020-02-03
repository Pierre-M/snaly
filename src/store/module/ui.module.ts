"use strict";

import Vue from "vue";
import { RootState } from "@/store/state";
import { Module } from "vuex";
import DesktopLayout from "@/ui/layout/DesktopLayout.vue";

export interface UIModuleState {
    layout: typeof Vue;
}

export const uiModule: Module<UIModuleState, RootState> = {
    state: {
        layout: DesktopLayout
    },
    getters: {
        layout(state: UIModuleState): typeof Vue {
            return state.layout;
        }
    }
};
