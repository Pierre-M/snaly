<template>
  <label
    class="w-full text-xl border-b border-white-20 focus-within:border-white transition-border duration-200 ease-in-out"
  >
    <input
      id="citySearchQueryInput"
      ref="inputEl"
      :value="query"
      class="py-2 w-full bg-transparent focus:outline-none"
      placeholder="Search for a city"
      @input="handleInput"
    />
    <span class="sr-only">Search for a city</span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from "vue";
import debounce from "lodash/debounce";

export default defineComponent({
  name: "LocationSearchInput",

  props: {
    modelValue: { type: String, required: true },
  },

  emits: {
    "update:modelValue": (query: string) => typeof query === "string",
  },

  setup(props: { modelValue: string }, { emit }) {
    const query = computed<string>({
      get: () => props.modelValue,
      set: debounce(
        (newQuery: string) => emit("update:modelValue", newQuery),
        300
      ),
    });

    const handleInput = (e: InputEvent) => {
      query.value = e.target.value;
    };

    const inputEl = ref<HTMLInputElement | null>(null);

    onMounted(async () => {
      await nextTick();
      inputEl.value?.focus();
    });

    return {
      query,
      inputEl,
      handleInput,
    };
  },
});
</script>
