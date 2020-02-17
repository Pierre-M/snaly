<template>
    <div class="w-full h-full select-none">
        <Layout>
            <wallpaper-component slot="bg" />
            <sharing-cta slot="header-l-actions" />
            <nav-widget v-if="displayNavWidget" slot="header-l-actions" />
            <slide-y-up-transition slot="title">
                <p v-if="currentLocation" class="flex items-center text-2xl font-semibold" id="appTitle">
                    {{ currentLocation | location }}
                    <favorite-location-toggle class="ml-2" />
                </p>
            </slide-y-up-transition>
            <city-search-widget slot="header-r-actions" />
            <current-weather-widget />
            <suncycle-widget slot="footer" />
            <daily-forecasts-widget slot="footer" />
        </Layout>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import WallpaperComponent from "@/ui/wallpaper/Wallpaper.vue";
import CurrentWeatherWidget from "@/ui/weather/CurrentWeatherWidget.vue";
import { Getter, State } from "vuex-class";
import Modal from "@/ui/core/components/Modal.vue";
import DailyForecastsWidget from "@/ui/weather/DailyForecastsWidget.vue";
import SuncycleWidget from "@/ui/weather/SuncycleWidget.vue";
import Layout from "@/ui/layout/Layout.vue";
import { GlobalGetter } from "@/store/getters";
import CitySearchWidget from "@/ui/city-search/CitySearchWidget.vue";
import NavWidget from "@/ui/layout/NavWidget.vue";
import { AppState } from "@/store/store";
import SharingCta from "@/ui/core/fundamentals/SharingCta.vue";
import FavoriteLocationToggle from "@/ui/favorite-locations/FavoriteLocationToggle.vue";
import { Nullable } from "@/types/app";
import { City } from "@/business/city-search/CitySearchService";
import { StoreAction } from "@/store/actions";

@Component({
    components: {
        FavoriteLocationToggle,
        SharingCta,
        NavWidget,
        CitySearchWidget,
        Layout,
        SuncycleWidget,
        DailyForecastsWidget,
        Modal,
        CurrentWeatherWidget,
        WallpaperComponent
    }
})
export default class App extends Vue {
    @Getter(GlobalGetter.APP_TITLE)
    appTitle!: string;

    @State((state: AppState) => state.localizationModule.location)
    currentLocation!: Nullable<City>;

    @State((state: AppState) => state.uiModule.screen.hasTouchSupport)
    hasTouchSupport!: boolean;

    get displayNavWidget(): boolean {
        return !this.hasTouchSupport;
    }

    created() {
        this.$store.dispatch(StoreAction.INIT);
    }

    @Watch(GlobalGetter.APP_TITLE, { immediate: true })
    updateAppTitle() {
        document.title = this.appTitle;
    }
}
</script>
