<template>
    <div class="desktop-layout">
        <div class="desktop-layout__background">
            <slot name="bg" />
        </div>

        <main class="desktop-layout__content">
            <header class="desktop-layout__header">
                <slot name="header" />
            </header>

            <div class="desktop-layout__body">
                <slot />
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DesktopLayout extends Vue {}
</script>

<style lang="scss" scoped>
$layout-index: 0;
$layout-layer-0: 0;
$layout-layer-1: $layout-layer-0 + 1;

.desktop-layout {
    position: relative;
    z-index: $layout-index;
    @include setSize(100vw, 100vh);

    &__background {
        position: fixed;
        z-index: $layout-layer-0;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    &__content {
        position: relative;
        z-index: $layout-layer-1;
        @include setSize(100%);
        display: flex;
        flex-direction: column;
    }

    &__body {
        flex: 1;
        @include boxAlign;
    }

    &__weather-widget {
        position: relative;
        z-index: $layout-layer-1;
    }
}
</style>
