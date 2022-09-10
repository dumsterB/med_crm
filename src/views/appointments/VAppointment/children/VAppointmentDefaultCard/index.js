import { mapState } from 'vuex';
import { insertRouteParams } from '@/utils/router.utils';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { User } from '@/models/User.model';
import { Appointment } from '@/models/Appointment.model';
import { PriceService } from '@/services/price.service';

import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';

export default {
  name: 'VAppointmentDefaultCard',
  components: { AppointmentStatusTag },
  emits: ['update:appointment', 'status:update', 'appointment:edit'],
  props: {
    appointment: {
      type: [Appointment, Object],
      default: () => new Appointment(),
    },
  },
  data() {
    return {
      loading: {},
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    patientPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.path,
        params: { id: this.appointment?.patient_id },
      });
    },
    appointmentInspectionCardPageLink() {
      return insertRouteParams({
        path: APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_INSPECTION_CARD._fullPath,
        params: { id: this.appointment.id },
      });
    },

    infoItems() {
      return [
        {
          label: this.$t('Appointments.StartDate'),
          value: Appointment.getStartDate(this.appointment.start_at || ''),
        },
        {
          label: this.$t('Appointments.StartTime'),
          value: Appointment.getStartTime(this.appointment.start_at || ''),
        },
        {
          label: this.$t('Base.Doctor'),
          value: this.appointment.doctor?.name,
        },
        {
          label: this.$t('Base.Service'),
          value: this.appointment.service?.title,
        },
        {
          label: this.$t('Base.Price'),
          value:
            PriceService.formatPrice({ price: this.appointment.service?.price }) +
            ' ' +
            this.$t('Base.Sum'),
        },
      ];
    },
  },

  methods: {
    goToInspectionCard() {
      const path = this.appointment.service_case_id
        ? APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_INSPECTION_CARD._fullPath
        : APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_TREATMENT_CARD._fullPath;

      this.$router.push(
        insertRouteParams({
          path: path,
          params: { id: this.appointment.id },
        })
      );
    },
  },

  setup: () => ({
    Appointment,
    User,
  }),
};
