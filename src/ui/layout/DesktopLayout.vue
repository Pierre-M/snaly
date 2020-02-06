<template>
    <div class="relative w-screen h-screen">
        <div class="fixed inset-0">
            <slot name="bg" />
        </div>

        <main class="relative w-full h-full flex flex-col">
            <header>
                <slot name="header" />
            </header>

            <div class="flex-1 flex items-center justify-center">
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
