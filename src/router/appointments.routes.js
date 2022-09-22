import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { onlyManagerMiddleware } from '@/middlewares/onlyManager.middleware';
import { onlyDoctorMiddleware } from '@/middlewares/onlyDoctor.middleware';
import { I18nService } from '@/services/i18n.service';

export const APPOINTMENTS_ROUTE = {
  name: 'APPOINTMENTS',
  path: '/appointments',
  component: 'VAppointments',
  beforeEnter: [onlyLoggedInMiddleware, onlyManagerMiddleware],
  meta: {
    title: I18nService.t('Base.PatientsRecords'),
  },
};

export const APPOINTMENT_ROUTE = {
  name: 'APPOINTMENT',
  path: '/appointments/:id',
  component: 'VAppointment',
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.PatientRecord'),
  },
  props: true,
  redirect: (route) => route.path + '/default-card',

  childrenMap: {
    APPOINTMENT_ROUTE_DEFAULT_CARD: {
      name: 'APPOINTMENT_DEFAULT_CARD',
      path: 'default-card',
      _fullPath: '/appointments/:id/default-card',
      component: 'VAppointmentDefaultCard',
    },
    APPOINTMENT_ROUTE_INSPECTION_CARD: {
      name: 'APPOINTMENT_INSPECTION_CARD',
      path: 'inspection-card',
      _fullPath: '/appointments/:id/inspection-card',
      component: 'VAppointmentDefaultInspectionCard',
      beforeEnter: [onlyDoctorMiddleware],
    },
    APPOINTMENT_ROUTE_TREATMENT_CARD: {
      name: 'APPOINTMENT_TREATMENT_CARD',
      path: 'treatment-card',
      _fullPath: '/appointments/:id/treatment-card',
      component: 'VAppointmentTreatmentInspectionCard',
      beforeEnter: [onlyDoctorMiddleware],
    },
  },
  children: [], // утилита сама подставит сюда роуты из childrenMap
};

export const routes = [APPOINTMENTS_ROUTE, APPOINTMENT_ROUTE];
