<template>
    <div class="relative w-full h-full overflow-hidden">
        <div class="fixed inset-0">
            <slot name="bg" />
        </div>

        <main class="relative flex flex-col w-full h-full">
            <header class="px-6 py-4 backdrop-blur">
                <slot name="header" />
            </header>

            <div class="flex-1 flex items-center justify-center p-6">
                <slot />
            </div>

            <div class="max-w-screen-xs w-full mx-auto p-6">
                <slot name="footer" />
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DesktopLayout extends Vue {}
</script>
