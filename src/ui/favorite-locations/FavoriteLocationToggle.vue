<template>
    <icon-btn v-show="displayToggle" @click="toggle" :icon="icon" :label="label" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "../core/fundamentals/IconBtn.vue";
import { Action, Getter, State } from "vuex-class";
import { AppState } from "@/store/store";
import { Nullable } from "@/types/app";
import { City } from "@/business/city-search/CitySearchService";
import { UserPreferencesModuleAction } from "@/store/module/userPreferences.module";
import { GlobalGetter } from "@/store/getters";

@Component({
    components: { IconBtn }
})
export default class FavoriteLocationToggle extends Vue {
    @State((state: AppState) => state.localizationModule.location)
    currentLocation!: Nullable<City>;

    @Action(UserPreferencesModuleAction.ADD_FAVORITE_LOCATION)
    addToFavorite!: (city: City) => void;

    @Action(UserPreferencesModuleAction.REMOVE_FAVORITE_LOCATION)
    removeFromFavorite!: (city: City) => void;

    @Getter(GlobalGetter.IS_CURRENT_LOCATION_FAVORITE)
    hasToBeRemoved!: boolean;

    toggle() {
        if (!this.currentLocation) return;

        if (this.hasToBeRemoved) {
            this.removeFromFavorite(this.currentLocation);
            return;
        }

        this.addToFavorite(this.currentLocation);
    }

    get displayToggle(): boolean {
        return !!this.currentLocation;
    }

    get icon(): string {
        return this.hasToBeRemoved ? "star_full" : "star";
    }

    get label() {
        const currentLocationName = this.currentLocation?.name;

        return this.hasToBeRemoved
            ? this.$t("favoriteLocations.remove", [currentLocationName])
            : this.$t("favoriteLocations.add", [currentLocationName]);
    }
}
</script>

<style lang="scss" scoped></style>
