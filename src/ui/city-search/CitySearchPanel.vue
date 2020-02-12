<template>
    <portal to="citySearchContainer">
        <fade-transition :duration="150">
            <section v-show="opened" class="fixed inset-0 bg-backdrop backdrop-blur text-white p-6">
                <div class="m-auto w-full max-w-screen-xs">
                    <slide-y-down-transition :duration="150">
                        <header v-if="opened">
                            <city-search-input v-model="query" v-debounce="() => getCities({ query })" />
                        </header>
                    </slide-y-down-transition>

                    <city-search-results :results="results" @select="selectCity" />

                    <span v-show="loading">Loading...</span>
                </div>
            </section>
        </fade-transition>
    </portal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, Mutation, State } from "vuex-class";
import { UIModuleActions, UIModuleGetter } from "@/store/module/ui.module";
import CitySearchInput from "@/ui/city-search/CitySearchInput.vue";
import { CitySearchModuleAction } from "@/store/module/citySearch.module";
import CitySearchResults from "@/ui/city-search/CitySearchResults.vue";
import { AppState } from "@/store/store";
import { City } from "@/business/city-search/CitySearchService";
import { LocalizationModuleMutation } from "@/store/module/localization.module";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";

@Component({
    components: { CitySearchResults, CitySearchInput }
})
export default class CitySearchPanel extends Vue {
    @Getter(UIModuleGetter.IS_CITY_SEARCH_OPENED)
    opened!: boolean;

    @State(state => (state as AppState).citySearchModule.loading)
    loading!: boolean;

    @State(state => (state as AppState).citySearchModule.results)
    results!: City[];

    @Action(CitySearchModuleAction.GET_CITIES)
    getCities!: () => void;

    @Action(UIModuleActions.CLOSE_CITY_SEARCH)
    closeSearchPanel!: () => void;

    @Mutation(LocalizationModuleMutation.UPDATE_COORDINATES)
    updateCoordinates!: (coordinates: UserCoordinates) => void;

    query: string = "";

    selectCity(city: City) {
        this.updateCoordinates(city.coordinates);
        this.closeSearchPanel();
    }
}
</script>

<style lang="scss" scoped></style>
