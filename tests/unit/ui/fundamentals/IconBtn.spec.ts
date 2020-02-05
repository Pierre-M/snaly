"use strict";

import { Wrapper } from "@vue/test-utils";
import { shallowMount, triggerDOMEvent } from "../../_utils";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";

let wrapper: Wrapper<any>;

describe("IconBtn", () => {
    beforeEach(() => {
        wrapper = shallowMount(IconBtn, {
            propsData: {
                icon: "my-icon"
            },
            slots: {
                default: "My button label"
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should render given icon", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should emit right events", async () => {
        triggerDOMEvent(wrapper.element, "click");
        expect(wrapper.emitted().click).toBeTruthy();
    });
});
