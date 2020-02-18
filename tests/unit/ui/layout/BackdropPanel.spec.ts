"use strict";

import { Wrapper } from "@vue/test-utils";
import BackdropPanel from "@/ui/layout/BackdropPanel.vue";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";
import { UIModuleActions } from "@/store/module/ui.module";
import { shallowMount } from "../../_utils";
import { fakeStore } from "../../_utils/FakeStore";

const PANEL_ID = "myPanel";
let wrapper: Wrapper<BackdropPanel>;

describe("BackdropPanel", () => {
    beforeEach(() => {
        wrapper = shallowMount(BackdropPanel, {
            propsData: {
                id: PANEL_ID,
                closeLabel: "Close"
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should be hidden by default", () => {
        expect(wrapper.find("[data-panel]").isVisible()).toBe(false);
    });

    it("should be hidden when openedPanel state does not match current id", () => {
        fakeStore.state.uiModule.openedPanel = "otherPanel";
        expect(wrapper.find("[data-panel]").isVisible()).toBe(false);
    });

    it("should be visible when openedPanel state matches current id", () => {
        fakeStore.state.uiModule.openedPanel = PANEL_ID;
        expect(wrapper.find("[data-panel]").isVisible()).toBe(true);
    });

    it("should call for close action upon click on close button", () => {
        wrapper.find(IconBtn).vm.$emit("click");
        expect(fakeStore.dispatch).toHaveBeenCalledWith(UIModuleActions.CLOSE_PANEL);
    });

    it("should emit opened event upon opening", () => {
        fakeStore.state.uiModule.openedPanel = PANEL_ID;
        expect(wrapper.emitted().opened).toBeTruthy();
    });

    it("should emit opened event upon closing", () => {
        fakeStore.state.uiModule.openedPanel = PANEL_ID;
        fakeStore.state.uiModule.openedPanel = null;
        expect(wrapper.emitted().closed).toBeTruthy();
    });
});
