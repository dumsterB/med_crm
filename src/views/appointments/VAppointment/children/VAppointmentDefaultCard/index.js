import { mapState } from 'vuex';
import { insertRouteParams } from '@/utils/router.utils';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { User } from '@/models/User.model';
import { Appointment } from '@/models/Appointment.model';
import { PriceService } from '@/services/price.service';

import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';

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

  setup: () => ({
    Appointment,
    User,
  }),
};
