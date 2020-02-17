"use strict";

import FavoriteLocationToggle from "@/ui/favorite-locations/FavoriteLocationToggle.vue";
import { Wrapper } from "@vue/test-utils";
import { shallowMount } from "../../_utils";
import { fakeStore } from "../../_utils/FakeStore";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";
import { generateCity } from "../../_mocks/generators/CityGenerator";
import { UserPreferencesModuleAction } from "@/store/module/userPreferences.module";
import { GlobalGetter } from "@/store/getters";

let wrapper: Wrapper<FavoriteLocationToggle>;

describe("FavoriteLocationToggle", () => {
    beforeEach(() => {
        wrapper = shallowMount(FavoriteLocationToggle);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should not be visible if current location is null", () => {
        fakeStore.state.localizationModule.location = null;

        expect(wrapper.find(IconBtn).isVisible()).toBe(false);
    });

    it("should be visible if current location is not null", () => {
        fakeStore.state.localizationModule.location = generateCity();

        expect(wrapper.find(IconBtn).isVisible()).toBe(true);
    });

    it("should call for favorite location addition upon click if current location is not already stored as favorite", () => {
        const city = generateCity();
        fakeStore.state.localizationModule.location = city;
        fakeStore.getters[GlobalGetter.IS_CURRENT_LOCATION_FAVORITE] = false;

        wrapper.find(IconBtn).vm.$emit("click");

        expect(fakeStore.dispatch).toHaveBeenCalledWith(UserPreferencesModuleAction.ADD_FAVORITE_LOCATION, city);
    });

    it("should call for favorite location removal upon click if current location is already stored as favorite", () => {
        const city = generateCity();
        fakeStore.state.localizationModule.location = city;
        fakeStore.getters[GlobalGetter.IS_CURRENT_LOCATION_FAVORITE] = true;

        wrapper.find(IconBtn).vm.$emit("click");

        expect(fakeStore.dispatch).toHaveBeenCalledWith(UserPreferencesModuleAction.REMOVE_FAVORITE_LOCATION, city);
    });
});
