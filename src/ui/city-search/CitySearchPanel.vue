<template>
    <backdrop-panel :id="id" :close-label="$t('citySearch.closeLabel')" @closed="exitCitySearch">
        <div class="m-auto w-full h-full max-w-screen-xs flex flex-col">
            <header class="flex items-center">
                <city-search-input v-model="query" v-debounce="() => getCities({ query })" class="flex-1" />
                <request-geolocation-cta class="ml-2" @click="exitCitySearch" />
            </header>

            <div class="relative flex-1 my-3">
                <fade-transition>
                    <favorite-location-list-widget
                        v-show="displayFavoriteLocations"
                        @select="selectCity"
                        class="mt-10"
                    />
                </fade-transition>
                <city-search-results
                    class="absolute inset-x-0 top-0 max-h-full"
                    :results="results"
                    @select="selectCity"
                />
            </div>
        </div>
    </backdrop-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";
import { UIModuleActions } from "@/store/module/ui.module";
import CitySearchInput from "@/ui/city-search/CitySearchInput.vue";
import { CitySearchModuleAction } from "@/store/module/citySearch.module";
import CitySearchResults from "@/ui/city-search/CitySearchResults.vue";
import { AppState } from "@/store/store";
import { City } from "@/business/city-search/CitySearchService";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";
import { LocalizationModuleMutation } from "@/store/module/localization.module";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import RequestGeolocationCta from "@/ui/geolocation/RequestGeolocationCta.vue";
import BackdropPanel from "@/ui/layout/BackdropPanel.vue";
import FavoriteLocationListWidget from "@/ui/favorite-locations/FavoriteLocationListWidget.vue";

@Component({
    components: {
        FavoriteLocationListWidget,
        BackdropPanel,
        RequestGeolocationCta,
        IconBtn,
        CitySearchResults,
        CitySearchInput
    }
})
export default class CitySearchPanel extends Vue {
    @Prop({ type: String, required: true })
    id!: string;

    @State(state => (state as AppState).citySearchModule.loading)
    loading!: boolean;

    @State(state => (state as AppState).citySearchModule.results)
    results!: City[];

    @Action(CitySearchModuleAction.GET_CITIES)
    getCities!: () => void;

    @Action(CitySearchModuleAction.RESET_CITIES)
    resetCities!: () => void;

    @Action(UIModuleActions.CLOSE_PANEL)
    closePanel!: () => void;

    @Mutation(LocalizationModuleMutation.UPDATE_COORDINATES)
    updateCoordinates!: (coords: UserCoordinates) => void;

    query: string = "";

    get displayFavoriteLocations(): boolean {
        return !this.results.length;
    }

    selectCity(city: City) {
        this.updateCoordinates(city.coordinates);
        this.exitCitySearch();
    }

    exitCitySearch() {
        this.query = "";
        this.resetCities();
        this.closePanel();
    }
}
</script>

<style lang="scss" scoped></style>
