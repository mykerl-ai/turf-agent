import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProfileView.vue"),
  },
  {
    path: "/property/:id",
    name: "SingleProperty",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SingleProperty.vue"),
  },

  {
    path: "/wallet",
    name: "WalletPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/WalletPage.vue"),
  },
  {
    path: "/house/add",
    name: "AddHouse",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddHouse.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
