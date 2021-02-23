<template>
  <teleport to="body">
    <TransitionWrapper @after-leave="$emit('closed')">
      <section
        v-show="opened"
        class="fixed inset-0 backdrop-blur bg-backdrop text-white p-6 overflow-auto flex flex-col"
      >
        <div class="flex-1 mb-3">
          <TransitionWrapper name="slide-from-top">
            <div v-if="opened" class="h-full">
              <slot />
            </div>
          </TransitionWrapper>
        </div>

        <TransitionWrapper name="slide-from-bottom">
          <div v-show="opened" class="flex justify-center">
            <IconButton
              icon="mdi:close"
              label="Close"
              bordered
              quiet
              @click="close"
            />
          </div>
        </TransitionWrapper>
      </section>
    </TransitionWrapper>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TransitionWrapper from "@/core/ui/transitions/TransitionWrapper.vue";
import usePanel from "@/core/ui/panel/usePanel";
import IconButton from "@/core/ui/icon-button/IconButton.vue";

export default defineComponent({
  name: "Panel",

  components: { IconButton, TransitionWrapper },

  props: {
    id: { type: String, required: true },
  },

  emits: ["closed"],

  setup(props: { id: string }) {
    const { opened, close } = usePanel(props.id);

    return {
      opened,
      close,
    };
  },
});
</script>
