"use strict";

import Vue from "vue";
import { ModalEventPayload, ModalPlugin } from "@/ui/core/vue-plugins/ModalPlugin";
import { bus, Events } from "@/ui/core/events";

jest.mock("@/ui/core/events");

let vueInstance: Vue;
Vue.use(ModalPlugin);

describe("ModalPlugin", () => {
    beforeEach(() => {
        vueInstance = new Vue();
    });

    afterEach(() => {
        vueInstance.$destroy();
    });

    it("should fire right event when open function is called", () => {
        const id = "dummyId";
        const data = { foo: "bar" };
        const expected: ModalEventPayload = { id, data };

        vueInstance.$modal.open(id, data);
        expect(bus.$emit).toHaveBeenCalledWith(Events.OPEN_MODAL, expected);
    });

    it("should fire right event when close function is called", () => {
        const id = "otherId";
        const data = { obi: "wan" };
        const expected: ModalEventPayload = { id, data };

        vueInstance.$modal.close(id, data);
        expect(bus.$emit).toHaveBeenCalledWith(Events.CLOSE_MODAL, expected);
    });
});
