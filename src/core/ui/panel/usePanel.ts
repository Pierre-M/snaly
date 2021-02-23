import { computed, ref } from "vue";

const openedPanel = ref<string | null>(null);

export default (id?: string) => {
  const opened = computed<boolean>(() => id === openedPanel.value);
  const open = () => {
    if (!id) return;
    openedPanel.value = id;
  };
  const close = () => (openedPanel.value = null);

  return {
    opened,
    open,
    close,
  };
};
