<template>
    <div class="relative w-full h-full overflow-hidden p-6">
        <div class="fixed inset-0">
            <slot name="bg" />
        </div>

        <main class="relative flex flex-col w-full h-full">
            <header>
                <slot name="header" />
            </header>

            <div class="flex-1 flex items-center justify-center">
                <slot />
            </div>

            <div class="flex justify-center">
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
