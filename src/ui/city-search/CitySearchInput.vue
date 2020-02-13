<template>
    <div class="text-xl border-b border-white-20 focus-within:border-white transition-border duration-200 ease-in-out">
        <label>
            <input
                class="py-2 w-full bg-transparent border-0 placeholder-20 focus:outline-none"
                :placeholder="$t('citySearch.queryInputPlaceholder')"
                :value="inputValue"
                @input="triggerInput"
            />
            <span class="sr-only">{{ $t("citySearch.queryInputPlaceholder") }}</span>
        </label>
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

    triggerInput(e: Event) {
        this.inputValue = (e?.target as HTMLInputElement).value.trim();
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
