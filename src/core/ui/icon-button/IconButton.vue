<template>
  <button
    v-bind="$attrs"
    type="button"
    :title="label"
    class="flex transform focus:outline-none rounded-full active:scale-95 w-7 h-7"
    :class="{
      'border-2 border-white p-2 w-11 h-11': bordered,
      'opacity-50 hover:opacity-100 transition-opacity': quiet,
    }"
  >
    <Icon :icon="icon" class="w-full h-full" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/core/ui/icon/Icon.vue";

export default defineComponent({
  name: "IconButton",
  components: { Icon },
  props: {
    icon: { type: String, required: true },
    label: { type: String, required: true },
    bordered: { type: Boolean, default: false },
    quiet: { type: Boolean, default: false },
  },
});
</script>
