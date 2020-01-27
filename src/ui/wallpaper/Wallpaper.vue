<template>
    <fade-transition>
        <div
            ref="backgroundContainer"
            aria-hidden="true"
            class="wallpaper-container"
            v-if="wallpaper"
            :style="`background-color: ${wallpaper.color}`"
        />
    </fade-transition>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { FadeTransition } from "vue2-transitions";
import { Nullable } from "@/types/app";
import { AppState } from "@/store";
import { ContextualImage } from "@/core/image/ContextualImageService";

@Component({
    components: { FadeTransition }
})
export default class WallpaperCompponent extends Vue {
    @State((state: AppState) => state.wallpaper)
    wallpaper!: Nullable<ContextualImage>;

    @Watch("wallpaper", { immediate: true, deep: true })
    lazyLoadWallpaper() {
        if (!this.wallpaper) {
            return;
        }

        const img = document.createElement("img");
        img.classList.add("wallpaper-container__image");

        img.addEventListener("load", () => {
            const container = this.$refs.backgroundContainer as HTMLDivElement;
            container.innerHTML = "";
            container.insertAdjacentElement("beforeend", img);
            setTimeout(() => img.classList.add("loaded"), 100);
        });

        img.src = this.wallpaper.src;
    }
}
</script>

<style lang="scss">
@import "../../../node_modules/reset-css/reset.css";

@keyframes imgAnim {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.wallpaper-container {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &__image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition-property: opacity;
        transition-duration: 1s;
        transition-timing-function: ease-out;

        &.loaded {
            opacity: 1;
        }
    }
}
</style>
