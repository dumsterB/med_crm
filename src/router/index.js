import { createRouter, createWebHistory } from 'vue-router';
import { setComponentInRoutesByViewsFolder } from '@/utils/router.utils';
import { routes as authRoutes } from './auth.routes.js';
import { routes as patientsRoutes } from './patients.routes';
import { routes as dashboardRoutes, DASHBOARD_ROUTE } from './dashboard.routes';
import { routes as doctorsRoutes, DOCTORS_QUEUE_ROUTE } from './doctors.routes';
import { routes as appointmentsRoutes } from './appointments.routes';

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

    ...setComponentInRoutesByViewsFolder({
      routes: [
        ...authRoutes,
        ...patientsRoutes,
        ...dashboardRoutes,
        ...doctorsRoutes,
        ...appointmentsRoutes,
      ],
    }),
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
      return next(DASHBOARD_ROUTE.path);
    case User.enum.roles.Doctor:
      return next(DOCTORS_QUEUE_ROUTE);
  }
}
