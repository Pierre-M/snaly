<template>
  <transition
    enter-active-class="transition-all duration-150 ease-out-quad"
    leave-active-class="transition-all duration-150 ease-in-quad"
    appear
    v-bind="{ ...transitionClasses, ...$attrs }"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import transitionClassesRegistry, {
  TransitionClasses,
} from "@/core/ui/transitions/transitionClassesRegistry";

export default defineComponent({
  name: "TransitionWrapper",

  props: {
    name: {
      type: String,
      default: "fade",
      validator: (val) => Object.keys(transitionClassesRegistry).includes(val),
    },
  },

  setup(props: { name: string }) {
    const transitionClasses = computed<TransitionClasses>(
      () => transitionClassesRegistry[props.name]
    );

    return {
      transitionClasses,
    };
  },
});
</script>
