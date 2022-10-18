import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { I18nService } from '@/services/i18n.service';
import { onlyDoctorMiddleware } from '@/middlewares/onlyDoctor.middleware';

export const PATIENTS_ROUTE = {
  name: 'PATIENTS',
  path: '/patients',
  component: 'VPatients',
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.Patients'),
  },
};

export const PATIENT_ROUTE = {
  name: 'PATIENT',
  path: '/patients/:id',
  component: 'VPatient',
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.Patient'),
  },
  props: true,
  redirect: (route) => route.path + '/default',

  childrenMap: {
    PATIENT_ROUTE_DEFAULT: {
      name: 'PATIENT_DEFAULT',
      path: 'default',
      _fullPath: '/patients/:id/default',
      component: 'VPatientDefault',
    },
    PATIENT_ROUTE_AMBULATORY_CARD: {
      name: 'PATIENT_AMBULATORY_CARD',
      path: 'ambulatory-card',
      _fullPath: '/patients/:id/ambulatory-card',
      component: 'VPatientAmbulatoryCard',
      beforeEnter: [onlyDoctorMiddleware],
      meta: {
        title: I18nService.t('Base.AmbulatoryCard'),
      },
    },
  },
};

export const routes = [PATIENTS_ROUTE, PATIENT_ROUTE];
