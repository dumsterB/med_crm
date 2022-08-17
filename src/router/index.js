import { createRouter, createWebHistory } from 'vue-router';
import { routes as authRoutes } from './auth.routes.js';
import {
  routes as registryRoutes,
  REGISTRY_DASHBOARD_ROUTE,
  REGISTRY_PATIENTS_ROUTE,
} from './registry.routes';
import { DOCTORS_QUEUE_ROUTE, routes as doctorsRoutes } from './doctors.routes';
import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { Store } from '@/store';
import { User } from '@/models/User.model';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: [onlyLoggedInMiddleware, _redirectCurrentPageByUserRole],
    },

    ...authRoutes,
    ...registryRoutes,
    ...doctorsRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'zordoc';

  next();
});
export { router as Router };

function _redirectCurrentPageByUserRole(to, from, next) {
  switch (Store.state.auth.user.role) {
    case User.enum.roles.Manager:
      return next(REGISTRY_DASHBOARD_ROUTE.path);
    case User.enum.roles.Doctor:
      return next(DOCTORS_QUEUE_ROUTE);
    // return next(REGISTRY_PATIENTS_ROUTE.path);
  }
}
