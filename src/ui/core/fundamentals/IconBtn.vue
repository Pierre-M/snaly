<template>
    <button
        type="button"
        class="icon-btn flex items-center justify-center p-0 outline-none border-0
            focus:outline-none transform transition duration-200 ease-in-out active:scale-75 rounded-full"
        :class="{
            'border-2 border-white p-2': bordered,
            'border-white-20 text-white-20 hover:border-white hover:text-white': quiet
        }"
        v-haptic
        :title="label"
        :aria-label="label"
        @click="clickHandler"
    >
        <icon :icon="icon" class="text-3xl" />
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

    @Prop({ type: Boolean, default: false })
    bordered!: boolean;

    @Prop({ type: Boolean, default: false })
    quiet!: boolean;

    clickHandler(e: Event) {
        this.$emit("click", e);
    }
}
</script>
