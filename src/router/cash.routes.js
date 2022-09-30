import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { I18nService } from '@/services/i18n.service';

export const CASH_ROUTE = {
  name: 'CASH',
  path: '/cash',
  component: 'VCash',
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.CashRegister'),
  },
};

export const routes = [CASH_ROUTE];
