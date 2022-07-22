import { createRouter, createWebHistory } from 'vue-router';
import { routes as authRoutes, LOGIN_ROUTE } from './auth.routes.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: LOGIN_ROUTE.path,
    },

    ...authRoutes,
  ],
});

export { router as Router };
