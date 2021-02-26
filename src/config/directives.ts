import { App } from "vue";
import Hammer from "hammerjs";

export default (app: App) => {
  app.directive("click-outside", {
    beforeMount(el, binding) {
      el.clickOutsideEvent = function (event: any) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el);
        }
      };
      document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
      document.body.removeEventListener("click", el.clickOutsideEvent);
    },
  });

  app.directive("swipe", {
    beforeMount(el) {
      el.hammerjs = new Hammer(el);
    },
    mounted(el, binding) {
      if (!["left", "right"].includes(binding.arg ?? "")) return;

      el.hammerjs.on(`swipe${binding.arg}`, binding.value);
    },
    unmounted(el, binding) {
      el.hammerjs.off("swipeleft,swiperight,swipe", binding.value);
    },
  });
};
