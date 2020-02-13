"use strict";

import { shallowMount } from "../../_utils";
import RequestGeolocationCta from "@/ui/geolocation/RequestGeolocationCta.vue";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";
import { Wrapper } from "@vue/test-utils";
import { LocalizationModuleAction } from "@/store/module/localization.module";

let wrapper: Wrapper<RequestGeolocationCta>;

describe("AllowUserGeolocationCta", () => {
    beforeEach(() => {
        wrapper = shallowMount(RequestGeolocationCta);
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should request geolocation upon click", () => {
        wrapper.find(IconBtn).vm.$emit("click");
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(LocalizationModuleAction.REQUEST_GEOLOCATION);
    });
});
