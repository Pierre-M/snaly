"use strict";

import App from "@/App.vue";
import { shallowMount } from "../_utils";
import { fakeStore } from "../_utils/FakeStore";

describe("App root component", () => {
    it("should dispatch init action to the store", () => {
        shallowMount(App);

        expect(fakeStore.dispatch).toHaveBeenCalledWith("init");
    });
});
