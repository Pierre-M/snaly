<template>
    <main class="app-container">
        <slot />

        <portal-target name="modalContainer" multiple />
    </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Container extends Vue {}
</script>