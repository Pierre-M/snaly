<template>
    <i :class="iconClasses" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Icon extends Vue {
    @Prop({ type: String, required: true })
    icon!: string;

    get iconClasses(): string[] {
        return ["icon", `icon-${this.icon}`];
    }
}
</script>

<style lang="scss" scoped>
@import "@/ui/style/_icons.scss";
</style>
