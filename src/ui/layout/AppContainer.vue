<template>
  <main class="app-container">
    <slot />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppContainer extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../../node_modules/reset-css/reset.css";

.app-container {
}
</style>
