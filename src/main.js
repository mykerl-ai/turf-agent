import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueGoogleMaps from "@fawmi/vue-google-maps";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import { API } from "./api/api";
import { createApolloProvider } from "@vue/apollo-option";
import Toast from "vue-toastification";

import TurfLoader from "@/components/TurfLoader.vue";

import "@/index.css";
import "vue-toastification/dist/index.css";

const app = createApp(App);
const apolloProvider = createApolloProvider({
  defaultClient: API,
});
app.config.productionTip = false;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.component("TurfLoader", TurfLoader);
app
  .use(router)
  .use(pinia)
  .use(apolloProvider)
  .use(Toast)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBwS4eTwFMHed4ZGtrgokcDgCOPb4-JnXY",
      libraries: "places",
    },
  })
  .mount("#app");
