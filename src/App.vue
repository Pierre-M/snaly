<template>
    <div class="w-full h-full">
        <component :is="layout">
            <wallpaper-component slot="bg" />
            <app-header slot="header" />
            <current-weather-widget />
            <daily-forecasts-widget slot="footer" />
        </component>
        <portal-target name="modalContainer" multiple></portal-target>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import WallpaperComponent from "@/ui/wallpaper/Wallpaper.vue";
import CurrentWeatherWidget from "@/ui/current-weather-widget/CurrentWeatherWidget.vue";
import { Getter } from "vuex-class";
import AppHeader from "@/ui/layout/AppHeader.vue";
import Modal from "@/ui/core/components/Modal.vue";
import DailyForecastsWidget from "@/ui/forecast/DailyForecastsWidget.vue";
import { UIModuleGetter } from "@/store/module/ui.module";

@Component({
    components: {
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
