<template>
    <button type="button" class="icon-btn" v-haptic :aria-label="label" @click="clickHandler">
        <icon :icon="icon" />
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Icon from "@/ui/core/fundamentals/Icon.vue";

@Component({
    components: { Icon }
})
export default class IconBtn extends Vue {
    @Prop({ type: String, required: true })
    icon!: string;

    @Prop({ type: String, required: true })
    label!: string;

    clickHandler(e: Event) {
        this.$emit("click", e);
    }
}
</script>

<style lang="scss" scoped>
$icon-btn-inner-space: 10px;

.icon-btn {
    @include boxAlign;
    @include quietButton;
    @include clickable;
    color: inherit;
    font-size: 30px;
    @include withTransition;

    &:active {
        transform: scale(0.8);
    }
}
</style>
