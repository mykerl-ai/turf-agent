import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterPage.vue"),
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
    path: "/appointment/:id",
    name: "ViewAppointment",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewAppointment.vue"),
  },

  {
    path: "/address/:id",
    name: "AddressDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddressDetails.vue"),
  },

  {
    path: "/wallet",
    name: "WalletPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/WalletPage.vue"),
  },
  {
    path: "/house/add/:id",
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
