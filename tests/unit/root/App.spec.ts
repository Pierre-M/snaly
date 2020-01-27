"use strict";

import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App root component", () => {
    it("should dispatch init action to the store", () => {
        const dummyStore = {
            dispatch: jest.fn()
        };

        shallowMount(App, {
            mocks: {
                $store: dummyStore
            }
        });

        expect(dummyStore.dispatch).toHaveBeenCalledWith("init");
    });
});
