<template>
    <div class="fixed inset-0 backdrop-blur bg-backdrop text-white p-6">
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BackdropPanel extends Vue {}
</script>
