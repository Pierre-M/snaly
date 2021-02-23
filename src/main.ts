import { createApp } from "vue";
import App from "./App.vue";
import "./core/styles/index.css";
import "@purge-icons/generated";
import providers from "@/config/providers";

const app = createApp(App);

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

providers(app);

app.mount("#app");
