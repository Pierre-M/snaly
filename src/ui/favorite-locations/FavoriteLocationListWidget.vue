<template>
    <panel-section title="Your favorite locations">
        <ul>
            <li class="mt-4 first:mt-0" v-for="location in favoriteLocations" :key="location.name">
                <favorite-location-widget :location="location" />
            </li>
        </ul>
    </panel-section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { AppState } from "@/store/store";
import { FavoriteLocation } from "@/business/favorite-locations/FavoriteLocationsService";
import PanelSection from "@/ui/layout/PanelSection.vue";
import FavoriteLocationWidget from "@/ui/favorite-locations/FavoriteLocationWidget.vue";
@Component({
    components: { FavoriteLocationWidget, PanelSection }
})
export default class FavoriteLocationListWidget extends Vue {
    @State((state: AppState) => state.userPreferencesModule.favoriteLocations)
    favoriteLocations!: FavoriteLocation[];
}
</script>

<style lang="scss" scoped></style>
