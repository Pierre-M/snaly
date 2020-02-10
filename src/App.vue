<template>
    <div class="w-full h-full select-none">
        <component :is="layout">
            <wallpaper-component slot="bg" />
            <app-header slot="header" />
            <current-weather-widget />
            <suncycle-widget slot="footer" />
            <daily-forecasts-widget slot="footer" />
        </component>
        <portal-target name="modalContainer" multiple></portal-target>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import WallpaperComponent from "@/ui/wallpaper/Wallpaper.vue";
import CurrentWeatherWidget from "@/ui/weather/CurrentWeatherWidget.vue";
import { Getter } from "vuex-class";
import AppHeader from "@/ui/layout/AppHeader.vue";
import Modal from "@/ui/core/components/Modal.vue";
import DailyForecastsWidget from "@/ui/weather/DailyForecastsWidget.vue";
import { UIModuleGetter } from "@/store/module/ui.module";
import SuncycleWidget from "@/ui/weather/SuncycleWidget.vue";

@Component({
    components: {
        SuncycleWidget,
        DailyForecastsWidget,
        Modal,
        AppHeader,
        CurrentWeatherWidget,
        WallpaperComponent
    }
})
export default class App extends Vue {
    @Getter("appTitle")
    appTitle!: string;

    @Getter(UIModuleGetter.LAYOUT)
    layout!: typeof Vue;

    created() {
        this.$store.dispatch("init");
    }

    @Watch("appTitle", { immediate: true })
    updateAppTitle() {
        document.title = this.appTitle;
    }
}
</script>
