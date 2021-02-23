<template>
  <div class="fixed inset-0">
    <slot name="bg" />
  </div>
  <main class="relative flex flex-col w-full h-full overflow-hidden">
    <header
      class="px-6 py-4 backdrop-blur flex justify-between items-center text-white"
    >
      <div class="w-20 flex items-center">
        <slot name="header-l-actions" />
      </div>
      <slot name="title" />
      <div class="w-20 flex justify-end">
        <slot name="header-r-actions" />
      </div>
    </header>

    <div class="flex-1 flex items-center justify-center p-6">
      <slot />
    </div>

    <div class="max-w-screen-sm w-full mx-auto p-6">
      <slot name="footer" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLayout",
});
</script>
