<template>
    <div class="w-full h-full select-none">
        <Layout>
            <wallpaper-component slot="bg" />
            <nav-widget slot="header-l-actions" />
            <slide-y-up-transition slot="title">
                <p v-if="location" class="text-2xl font-semibold" id="appTitle">
                    {{ location }}
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
import { Getter } from "vuex-class";
import Modal from "@/ui/core/components/Modal.vue";
import DailyForecastsWidget from "@/ui/weather/DailyForecastsWidget.vue";
import SuncycleWidget from "@/ui/weather/SuncycleWidget.vue";
import Layout from "@/ui/layout/Layout.vue";
import { GlobalGetter } from "@/store/getters";
import CitySearchWidget from "@/ui/city-search/CitySearchWidget.vue";
import { LocalizationModuleGetter } from "@/store/module/localization.module";
import NavWidget from "@/ui/layout/NavWidget.vue";

@Component({
    components: {
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

    @Getter(LocalizationModuleGetter.SHORTENED_LOCATION)
    location!: string;

    created() {
        this.$store.dispatch("init");
    }

    @Watch(GlobalGetter.APP_TITLE, { immediate: true })
    updateAppTitle() {
        document.title = this.appTitle;
    }
}
</script>
