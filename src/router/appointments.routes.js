import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { onlyManagerMiddleware } from '@/middlewares/onlyManager.middleware';
import { I18nService } from '@/services/i18n.service';

export const APPOINTMENT_ROUTE = {
  name: 'APPOINTMENT_ROUTE',
  path: '/appointments/:id',
  component: 'VAppointment',
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.PatientRecord'),
  },
  props: true,
};

export const APPOINTMENTS_ROUTE = {
  name: 'APPOINTMENTS_ROUTE',
  path: '/appointments',
  component: 'VAppointments',
  beforeEnter: [onlyLoggedInMiddleware, onlyManagerMiddleware],
  meta: {
    title: I18nService.t('Base.PatientsRecords'),
  },
};

export const routes = [APPOINTMENTS_ROUTE, APPOINTMENT_ROUTE];