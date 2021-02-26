import { createApp } from "vue";
import App from "./App.vue";
import "./core/styles/index.css";
import "@purge-icons/generated";
import providers from "@/config/providers";
import directives from "@/config/directives";

const app = createApp(App);

directives(app);
providers(app);

app.mount("#app");
