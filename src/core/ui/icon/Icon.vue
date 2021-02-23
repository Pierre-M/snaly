<template>
  <span ref="wrapper" class="w-7 h-7">
    <span :class="iconClasses" :data-icon="icon"></span>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Icon",
  props: {
    icon: { type: String, required: true },
  },

  setup(props: { icon: string }) {
    const wrapper = ref<HTMLDivElement | null>(null);
    const iconClasses = ["iconify", "w-full", "h-full"];

    watch(
      () => props.icon,
      async () => {
        if (!wrapper.value) return;

        const iconEl = document.createElement("span");
        iconEl.classList.add(...iconClasses);
        iconEl.dataset.icon = props.icon;

        wrapper.value.innerHTML = "";
        wrapper.value.insertAdjacentElement("afterbegin", iconEl);
      }
    );

    return {
      iconClasses,
      wrapper,
    };
  },
});
</script>
