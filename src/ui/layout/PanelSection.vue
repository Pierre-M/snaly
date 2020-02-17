<template>
    <section>
        <header class="mb-6">
            <h2 class="font-title text-4xl text-gray-500">{{ title }}</h2>
        </header>

        <slot />
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PanelSection extends Vue {
    @Prop({ type: String, required: true })
    title!: string;
}
</script>

<style lang="scss" scoped></style>
