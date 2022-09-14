import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { I18nService } from '@/services/i18n.service';

export const DOCTORS_TREATMENT_ROUTE = {
  name: 'DOCTORS_TREATMENT',
  path: '/treatment/:id',
  component: 'VTreatment',
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.Template'),
  },
  props: true,
};

export const routes = [DOCTORS_TREATMENT_ROUTE];
