import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueGoogleMaps from "@fawmi/vue-google-maps";

import "@/index.css";

createApp(App)
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBwS4eTwFMHed4ZGtrgokcDgCOPb4-JnXY",
      libraries: "places",
    },
  })
  .mount("#app");
