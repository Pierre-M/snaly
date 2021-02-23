import { useLocalStorage } from "@vueuse/core";
import { Location } from "@/location/models/location.model";
import { computed, readonly, Ref } from "vue";

const bookmarks = useLocalStorage<Location[]>("BOOKMARKS", []);

export default (location?: Ref<Location>) => {
  const isBookmarked = computed<boolean>(() => {
    if (!location) return false;

    return !!bookmarks.value.find(
      (loc) => loc.formatted === location.value.formatted
    );
  });

  const add = () => {
    if (!location) return;
    bookmarks.value.push(location.value);
  };

  const remove = () => {
    if (!location) return;

    const idx = bookmarks.value.findIndex(
      (loc) => loc.formatted === location.value.formatted
    );

    if (idx < 0) return;

    bookmarks.value.splice(idx, 1);
  };

  const toggle = () => {
    isBookmarked.value ? remove() : add();
  };

  return {
    bookmarks: readonly(bookmarks),
    isBookmarked,
    toggle,
  };
};
