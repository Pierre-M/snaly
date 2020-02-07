<template>
    <fade-transition>
        <div
            ref="backgroundContainer"
            aria-hidden="true"
            class="fixed inset-0"
            v-if="wallpaper"
            :style="`background-color: ${wallpaper.color}`"
        />
    </fade-transition>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { Nullable } from "@/types/app";
import { ContextualImage } from "@/core/image/ContextualImageService";
import { AppState } from "@/store/store";

@Component
export default class WallpaperCompponent extends Vue {
    @State((state: AppState) => state.wallpaperModule.wallpaper)
    wallpaper!: Nullable<ContextualImage>;

    @Watch("wallpaper", { immediate: true, deep: true })
    lazyLoadWallpaper() {
        if (!this.wallpaper) {
            return;
        }

        const img = document.createElement("img");
        img.classList.add("wallpaper-image--nopurge");

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

.wallpaper-image--nopurge {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: none;
    max-height: none;
    opacity: 0;
    transition-property: opacity;
    transition-duration: 1s;
    transition-timing-function: ease-out;
    transition-delay: 500ms;

    &.loaded {
        opacity: 1;
    }
}
</style>
