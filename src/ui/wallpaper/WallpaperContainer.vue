<template>
    <main class="wallpaper-container">
        <fade-transition>
            <div
                ref="backgroundContainer"
                aria-hidden="true"
                class="wallpaper-container__background"
                v-if="wallpaper"
                :style="`background-color: ${wallpaper.color}`"
            />
        </fade-transition>
        <div class="wallpaper-container__content">
            <slot />
        </div>
    </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { Nullable } from "@/types/app";
import { Wallpaper } from "@/business/wallpaper/ContextualWallpaperService";
import { AppState } from "@/store";

@Component
export default class WallpaperContainer extends Vue {
    @State((state: AppState) => state.wallpaper)
    wallpaper!: Nullable<Wallpaper>;

    @Watch("wallpaper", { immediate: true, deep: true })
    lazyLoadWallpaper() {
        if (!this.wallpaper) {
            return;
        }

        const img = document.createElement("img");

        img.addEventListener("load", () => {
            const container = this.$refs.backgroundContainer as HTMLDivElement;
            container.innerHTML = "";
            container.insertAdjacentElement("beforeend", img);
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
    &__background {
        position: fixed;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        > img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-name: imgAnim;
            animation-duration: 1s;
            animation-iteration-count: 1;
            animation-timing-function: ease-out;
        }
    }

    &__content {
        position: relative;
        z-index: 1;
    }
}
</style>
