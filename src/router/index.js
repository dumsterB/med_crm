import { createRouter, createWebHistory } from 'vue-router';
import { routes as authRoutes, LOGIN_ROUTE } from './auth.routes.js';
import { routes as registryRoutes } from './registry.routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: LOGIN_ROUTE.path,
    },

    ...authRoutes,
    ...registryRoutes,
  ],
});

export { router as Router };
