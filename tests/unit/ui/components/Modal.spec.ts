"use strict";

import { shallowMount } from "../../_utils";
import Modal from "@/ui/core/components/Modal.vue";
import { Wrapper } from "@vue/test-utils";
import { bus, Events } from "@/ui/core/events";

const MODAL_BASE_SELECTOR = ".modal";
const DEFAULT_MODAL_ID = "dummyModal";

let wrapper: Wrapper<Modal>;

describe("Modal", () => {
    beforeEach(() => {
        wrapper = shallowMount(Modal, { propsData: { id: DEFAULT_MODAL_ID, title: "Default title" } });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should not display modal on component creation", () => {
        expect(wrapper.find(MODAL_BASE_SELECTOR).exists()).toBe(false);
    });

    it("should be displayed when open event is fired if given id is matching", () => {
        bus.$emit(Events.OPEN_MODAL, { id: DEFAULT_MODAL_ID });

        expect(wrapper.find(MODAL_BASE_SELECTOR).exists()).toBe(true);
    });

    it("should not be displayed when open event is fired if given id is not matching", () => {
        bus.$emit(Events.OPEN_MODAL, { id: "otherId" });

        expect(wrapper.find(MODAL_BASE_SELECTOR).exists()).toBe(false);
    });

    it("should not be displayed after close event firing if given id is matching", () => {
        bus.$emit(Events.OPEN_MODAL, { id: DEFAULT_MODAL_ID });
        bus.$emit(Events.CLOSE_MODAL, { id: DEFAULT_MODAL_ID });

        expect(wrapper.find(MODAL_BASE_SELECTOR).exists()).toBe(false);
    });

    it("should not displayed after close event firing if given id is not matching", () => {
        bus.$emit(Events.OPEN_MODAL, { id: DEFAULT_MODAL_ID });
        bus.$emit(Events.CLOSE_MODAL, { id: "otherId" });

        expect(wrapper.find(MODAL_BASE_SELECTOR).exists()).toBe(true);
    });
});
