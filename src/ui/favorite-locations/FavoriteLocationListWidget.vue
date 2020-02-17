<template>
    <panel-section title="Your favorite locations" id="favoriteLocationsList">
        <fade-transition :duration="150" group tag="ul">
            <li class=" w-full mt-4 first:mt-0" v-for="location in favoriteLocations" :key="location.name">
                <favorite-location-widget @click="triggerSelect(location)" :location="location" />
            </li>
        </fade-transition>
    </panel-section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { AppState } from "@/store/store";
import { FavoriteLocation } from "@/business/favorite-locations/FavoriteLocationsService";
import PanelSection from "@/ui/layout/PanelSection.vue";
import FavoriteLocationWidget from "@/ui/favorite-locations/FavoriteLocationWidget.vue";
import { City } from "@/business/city-search/CitySearchService";
@Component({
    components: { FavoriteLocationWidget, PanelSection }
})
export default class FavoriteLocationListWidget extends Vue {
    @State((state: AppState) => state.userPreferencesModule.favoriteLocations)
    favoriteLocations!: FavoriteLocation[];

    triggerSelect(city: City) {
        this.$emit("select", city);
    }
}
</script>

<style lang="scss" scoped></style>
