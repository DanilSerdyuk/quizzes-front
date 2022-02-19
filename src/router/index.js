import Vue from "vue";
import VueRouter from "vue-router";
import authRoutes from "@/router/auth";
import appRoutes from "@/router/app";
import { getSelfHost } from "@/services/config/env";
import authService from "@/services/api/auth";

Vue.use(VueRouter);

const routes = [...authRoutes, ...appRoutes];

const router = new VueRouter({
  mode: "history",
  base: getSelfHost(),
  routes,
});

const authNames = authRoutes[0].children.map((i) => i.name);

router.beforeEach((to, from, next) => {
  // if user not authenticated
  if (!authNames.includes(to.name) && !authService.getToken()) {
    return next({ name: "login" });
  }

  // If user authenticated, but trying go to login page
  if (authNames.includes(to.name) && authService.getToken()) {
    return next("/");
  }

  return next();
});

export default router;
