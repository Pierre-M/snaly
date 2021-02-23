import { computed, Ref } from "vue";
import { Location } from "@/location/models/location.model";
import useLocationBookmark from "@/location-bookmark/hooks/useLocationBookmark";

export enum NavigationDirection {
  PREV = "prev",
  NEXT = "next",
}

export default (location: Ref<Location>) => {
  const { bookmarks } = useLocationBookmark(location);

  const nextBookmark = computed<Location | null>(() => {
    const currentLocationIdx = bookmarks.value.findIndex(
      (loc) => loc.formatted === location.value.formatted
    );

    if (
      currentLocationIdx < 0 ||
      currentLocationIdx === bookmarks.value.length - 1
    )
      return bookmarks.value[0] ?? null;

    return bookmarks.value[currentLocationIdx + 1] ?? null;
  });

  const previousBookmark = computed<Location | null>(() => {
    const currentLocationIdx = bookmarks.value.findIndex(
      (loc) => loc.formatted === location.value.formatted
    );

    if (currentLocationIdx < 0 || currentLocationIdx === 0)
      return bookmarks.value[bookmarks.value.length - 1] ?? null;

    return bookmarks.value[currentLocationIdx - 1] ?? null;
  });

  const displayNavigation = computed<boolean>(() => !!bookmarks.value.length);

  return {
    displayNavigation,
    nextBookmark,
    previousBookmark,
  };
};
