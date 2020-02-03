<template>
    <container>
        <component :is="layout">
            <wallpaper-component slot="bg" />
            <app-header slot="header" />
            <current-weather-widget />
        </component>
    </container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Container from "@/ui/layout/Container.vue";
import WallpaperComponent from "@/ui/wallpaper/Wallpaper.vue";
import CurrentWeatherWidget from "@/ui/current-weather-widget/CurrentWeatherWidget.vue";
import { Getter } from "vuex-class";
import AppHeader from "@/ui/layout/AppHeader.vue";

@Component({
    components: {
        AppHeader,
        CurrentWeatherWidget,
        WallpaperComponent,
        Container
    }
})
export default class App extends Vue {
    @Getter("appTitle")
    appTitle!: string;

    @Getter("layout")
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
