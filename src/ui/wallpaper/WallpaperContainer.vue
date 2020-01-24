<template>
    <main class="wallpaper-container">
        <div
            class="wallpaper-container__background"
            v-if="wallpaper"
            :style="`background-image: url(${wallpaper.src})`"
        ></div>
        <div>
            <slot />
        </div>
    </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { Nullable } from "@/types/app";
import { Wallpaper } from "@/business/wallpaper/ContextualWallpaperService";
import { AppState } from "@/store";

@Component
export default class WallpaperContainer extends Vue {
    @State((state: AppState) => state.wallpaper)
    wallpaper!: Nullable<Wallpaper>;
}
</script>

<style lang="scss" scoped>
@import "../../../node_modules/reset-css/reset.css";

.wallpaper-container {
    &__background {
        position: fixed;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;

        & + * {
            position: relative;
            z-index: 1;
        }
    }
}
</style>
