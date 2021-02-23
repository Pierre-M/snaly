import { readonly, Ref, ref, watch } from "vue";
import { Wallpaper } from "@/wallpaper/models/wallpaper.model";
import useDevice from "@/core/device/hooks/useDevice";

export default (wallpaper: Ref<Wallpaper | null>) => {
  const { width, height } = useDevice();
  const container = ref<HTMLDivElement | null>(null);
  const loading = ref<boolean>(true);

  watch(wallpaper, (current) => {
    if (!current) return;
    loading.value = true;

    const img = document.createElement("img");

    img.width = width.value;
    img.height = height.value;
    img.classList.add(
      "w-full",
      "h-full",
      "object-cover",
      "transition-opacity",
      "opacity-0",
      "duration-500"
    );

    img.addEventListener("load", () => {
      if (!container.value) return;

      container.value.innerHTML = "";
      container.value.insertAdjacentElement("beforeend", img);
      setTimeout(() => {
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
        loading.value = false;
      }, 100);
    });

    img.src = current.src;
  });

  return {
    container,
    loading: readonly(loading),
  };
};
