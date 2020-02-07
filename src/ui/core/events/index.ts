"use strict";

import Vue from "vue";

export const bus = new Vue();
export enum Events {
    OPEN_MODAL = "openModal",
    CLOSE_MODAL = "closeModal"
}
