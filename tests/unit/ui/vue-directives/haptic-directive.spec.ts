"use strict";

import Vue from "vue";
import { fakeHapticFeedbackService } from "../../_mocks";
import "@/ui/core/vue-directives/haptic-directive";
import { Wrapper } from "@vue/test-utils";
import { shallowMount } from "../../_utils";

const FakeComponent = Vue.extend({
    template: "<button v-haptic></button>"
});

let wrapper: Wrapper<any>;

describe("haptic-directive", () => {
    beforeEach(() => {
        wrapper = shallowMount(FakeComponent);
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should call for HapticFeedbackService vibrate method upon click on targeted element", () => {
        wrapper.find("button").trigger("click");
        expect(fakeHapticFeedbackService.vibrate).toHaveBeenCalled();
    });
});
