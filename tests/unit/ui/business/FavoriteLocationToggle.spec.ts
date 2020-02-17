"use strict";

import FavoriteLocationToggle from "@/ui/favorite-locations/FavoriteLocationToggle.vue";
import { Wrapper } from "@vue/test-utils";
import { shallowMount } from "../../_utils";
import { fakeStore } from "../../_utils/FakeStore";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";
import { generateCity } from "../../_mocks/generators/CityGenerator";
import { UserPreferencesModuleAction } from "@/store/module/userPreferences.module";
import { City } from "@/business/city-search/CitySearchService";

let wrapper: Wrapper<FavoriteLocationToggle>;
let city: City;

describe("FavoriteLocationToggle", () => {
    beforeEach(() => {
        city = generateCity();
        wrapper = shallowMount(FavoriteLocationToggle, {
            propsData: {
                location: city
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call for favorite location addition upon click if current location is not already stored as favorite", () => {
        fakeStore.state.userPreferencesModule.favoriteLocations = [];

        wrapper.find(IconBtn).vm.$emit("click");

        expect(fakeStore.dispatch).toHaveBeenCalledWith(UserPreferencesModuleAction.ADD_FAVORITE_LOCATION, city);
    });

    it("should call for favorite location removal upon click if current location is already stored as favorite", () => {
        fakeStore.state.userPreferencesModule.favoriteLocations = [city];

        wrapper.find(IconBtn).vm.$emit("click");

        expect(fakeStore.dispatch).toHaveBeenCalledWith(UserPreferencesModuleAction.REMOVE_FAVORITE_LOCATION, city);
    });
});
