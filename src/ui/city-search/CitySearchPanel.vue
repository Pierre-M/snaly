<template>
    <portal to="panelContainer">
        <fade-transition :duration="150">
            <backdrop-panel v-show="opened" class="flex flex-col">
                <div class="m-auto w-full max-w-screen-xs flex-1 flex flex-col">
                    <slide-y-up-transition :duration="150">
                        <header v-if="opened" class="flex items-center">
                            <city-search-input v-model="query" v-debounce="() => getCities({ query })" class="flex-1" />
                            <request-geolocation-cta class="ml-2" @click="exitCitySearch" />
                        </header>
                    </slide-y-up-transition>

                    <div class="relative flex-1 my-3">
                        <city-search-results
                            class="absolute inset-x-0 max-h-full"
                            :results="results"
                            @select="selectCity"
                        />
                    </div>
                </div>

                <slide-y-down-transition>
                    <footer v-show="opened" class="flex justify-center">
                        <icon-btn
                            icon="close"
                            :label="$t('citySearch.closeLabel')"
                            :bordered="true"
                            :quiet="true"
                            @click="exitCitySearch"
                        />
                    </footer>
                </slide-y-down-transition>
            </backdrop-panel>
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
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";
import { LocalizationModuleMutation } from "@/store/module/localization.module";
import { UserCoordinates } from "@/business/geolocation/GeolocationService";
import RequestGeolocationCta from "@/ui/geolocation/RequestGeolocationCta.vue";
import BackdropPanel from "@/ui/layout/BackdropPanel.vue";

@Component({
    components: { BackdropPanel, RequestGeolocationCta, IconBtn, CitySearchResults, CitySearchInput }
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

    @Action(CitySearchModuleAction.RESET_CITIES)
    resetCities!: () => void;

    @Mutation(LocalizationModuleMutation.UPDATE_COORDINATES)
    updateCoordinates!: (coords: UserCoordinates) => void;

    @Action(UIModuleActions.CLOSE_CITY_SEARCH)
    closePanel!: () => void;

    query: string = "";

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
