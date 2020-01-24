<template>
    <div class="weather-screen-layout">
        <div class="weather-screen-layout__background">
            <slot name="wallpaper" />
        </div>
        <div class="weather-screen-layout__weather-widget">
            <slot name="weather-widget" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
$layout-index: 0;
$layout-layer-0: 0;
$layout-layer-1: $layout-layer-0 + 1;

.weather-screen-layout {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    &__background {
        position: fixed;
        z-index: $layout-layer-0;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    &__weather-widget {
        position: relative;
        z-index: $layout-layer-1;
    }
}
</style>
