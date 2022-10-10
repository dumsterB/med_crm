import { mapState } from 'vuex';
import { insertRouteParams } from '@/utils/router.utils';
import { formatPrice } from '@/utils/price.util';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { User } from '@/models/User.model';
import { Appointment } from '@/models/Appointment.model';

import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import { InspectionCard } from '@/models/InspectionCard.model';

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
          label: this.$t('Base.StatePrice'),
          value:
            formatPrice({
              price: this.appointment.services.reduce((total, obj) => obj.price + total, 0),
            }) +
            ' ' +
            this.$t('Base.Sum'),
        },
      ];
    },

    /** @return {Array<Service>} */
    services() {
      return this.appointment.services.map((service) => ({
        ...service,
        price: formatPrice({ price: service.price }) + ' ' + this.$t('Base.Sum'),
      }));
    },
  },

  methods: {
    goToInspectionCard() {
      const path =
        this.appointment.inspection_card?.type === InspectionCard.enum.types.Default
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
