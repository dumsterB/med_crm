import { createRouter, createWebHistory } from 'vue-router';
import { setComponentInRoutesByViewsFolder } from '@/utils/router.utils';
import { APPOINTMENTS_ROUTE } from '@/router/appointments.routes';
import { DOCTORS_QUEUE_ROUTE } from './doctors.routes';

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
        ..._getRoutes(),

        {
          path: '/404',
          name: '404',
          component: 'VNotFound',
          meta: { title: '404' },
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: '/404',
        },
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

// Assets

function _redirectCurrentPageByUserRole(to, from, next) {
  switch (Store.state.auth.user.role) {
    case User.enum.roles.Manager:
      return next(APPOINTMENTS_ROUTE.path);
    case User.enum.roles.Doctor:
      return next(DOCTORS_QUEUE_ROUTE);
  }
}

function _getRoutes() {
  const routesModules = import.meta.glob('@/router/**/*.routes.js', { eager: true });
  return Object.keys(routesModules).reduce(
    (acc, key) => [...acc, ...routesModules[key].routes],
    []
  );
}
