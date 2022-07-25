import VDashboard from '@/views/registry/VDashboard/index.vue';
import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';

export const REGISTRY_DASHBOARD_ROUTE = {
  name: 'REGISTRY_DASHBOARD',
  path: '/registry/dashboard',
  component: VDashboard,
  beforeEnter: [onlyLoggedInMiddleware],
};

export const routes = [REGISTRY_DASHBOARD_ROUTE];
