"use strict";

import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import { Store } from "vuex";
import DesktopLayout from "@/ui/layout/DesktopLayout.vue";

let store: Store<any>;

describe("App root component", () => {
    beforeEach(() => {
        store = ({
            dispatch: jest.fn(),
            getters: {
                appTitle: "Initial title",
                layout: DesktopLayout
            }
        } as unknown) as Store<any>;
    });

    it("should dispatch init action to the store", () => {
        shallowMount(App, {
            mocks: {
                $store: store
            }
        });

        expect(store.dispatch).toHaveBeenCalledWith("init");
    });

    it("should be able to update document title upon store changes", () => {
        shallowMount(App, {
            mocks: {
                $store: store
            }
        });

        expect(document.title).toBe(store.getters.appTitle);

        store.getters.appTitle = "New title";
        expect(document.title).toBe(store.getters.appTitle);
    });
});
