<template>
    <div>
        <input
            class="bg-transparent border-b border-white-20 placeholder-white focus:outline-none"
            placeholder="Search for a city"
            v-model="inputValue"
            @input="triggerInput"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Nullable } from "@/types/app";

@Component
export default class CitySearchInput extends Vue {
    @Prop({ type: String, required: true })
    value!: string;

    inputValue: string = "";
    inputEl: Nullable<HTMLInputElement> = null;

    @Watch("value")
    updateInputValue() {
        this.inputValue = this.value;
    }

    triggerInput() {
        this.$emit("input", this.inputValue);
    }

    mounted() {
        this.inputEl = this.$el.querySelector("input");

        if (this.inputEl) {
            this.inputEl.focus();
        }
    }
}
</script>
