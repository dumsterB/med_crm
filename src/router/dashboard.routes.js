import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { I18nService } from '@/services/i18n.service';

export const DASHBOARD_ROUTE = {
  name: 'REGISTRY_DASHBOARD',
  path: '/dashboard',
  component: 'VDashboard',
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.Dashboard'),
  },
};

export const routes = [DASHBOARD_ROUTE];
