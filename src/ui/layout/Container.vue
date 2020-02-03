<template>
    <main class="app-container">
        <slot />
    </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Container extends Vue {}
</script>

<style lang="scss">
@import "../../../node_modules/reset-css/reset.css";

* {
    box-sizing: border-box;
}

.app-container {
    font-family: $snaly_font_family;
}
</style>
