<template>
    <div class="relative w-full h-full overflow-hidden">
        <div class="fixed inset-0">
            <slot name="bg" />
        </div>

        <main class="relative flex flex-col w-full h-full">
            <header class="px-6 py-4 backdrop-blur flex justify-between items-center text-white">
                <div class="w-20">
                    <slot name="header-l-actions" />
                </div>
                <slot name="title" />
                <div class="w-20 flex justify-end">
                    <slot name="header-r-actions" />
                </div>
            </header>

            <div class="flex-1 flex items-center justify-center p-6">
                <slot />
            </div>

            <div class="max-w-screen-xs w-full mx-auto p-6">
                <slot name="footer" />
            </div>
        </main>

        <portal-target name="panelContainer" multiple></portal-target>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Layout extends Vue {}
</script>
