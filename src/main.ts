import { createApp } from "vue";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "~pages";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import type { UserModule } from "./types";

import "@unocss/reset/tailwind.css";
import "./styles/main.css";
import "uno.css";

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    next("login");
  } else {
    next();
  }
});
const app = createApp(App);
app.use(router);

Object.values(
  import.meta.glob<{ install: UserModule }>("./plugins/*.ts", { eager: true })
).forEach((i) => i.install?.({ app, router }));

app.mount("#app");
