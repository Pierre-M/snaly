<template>
    <icon-btn v-show="displayToggle" @click="toggle" :icon="icon" :label="label" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { isEqual } from "lodash";
import IconBtn from "../core/fundamentals/IconBtn.vue";
import { City } from "@/business/city-search/CitySearchService";
import { UserPreferencesModuleAction } from "@/store/module/userPreferences.module";
import { AppState } from "@/store/store";
import { FavoriteLocation } from "@/business/favorite-locations/FavoriteLocationsService";

@Component({
    components: { IconBtn }
})
export default class FavoriteLocationToggle extends Vue {
    @Prop({ type: Object, required: true })
    location!: City;

    @State((state: AppState) => state.userPreferencesModule.favoriteLocations)
    favoriteLocations!: FavoriteLocation[];

    @Action(UserPreferencesModuleAction.ADD_FAVORITE_LOCATION)
    addToFavorite!: (city: City) => void;

    @Action(UserPreferencesModuleAction.REMOVE_FAVORITE_LOCATION)
    removeFromFavorite!: (city: City) => void;

    get alreadyStored(): boolean {
        return !!this.favoriteLocations.find(l => isEqual(this.location.coordinates, l.coordinates));
    }

    toggle() {
        if (!this.location) return;

        if (this.alreadyStored) {
            this.removeFromFavorite(this.location);
            return;
        }

        this.addToFavorite(this.location);
    }

    get displayToggle(): boolean {
        return !!this.location;
    }

    get icon(): string {
        return this.alreadyStored ? "star_full" : "star";
    }

    get label() {
        const locationName = this.location?.name;

        return this.alreadyStored
            ? this.$t("favoriteLocations.remove", [locationName])
            : this.$t("favoriteLocations.add", [locationName]);
    }
}
</script>

<style lang="scss" scoped></style>
