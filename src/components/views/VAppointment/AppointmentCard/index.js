import { mapState } from 'vuex';
import { insertRouteParams } from '@/utils/router.utils';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { DOCTORS_QUEUE_ROUTE } from '@/router/doctors.routes';
import { User } from '@/models/User.model';
import { Appointment } from '@/models/Appointment.model';
import { PriceService } from '@/services/price.service';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import SelectAppointmentInspectionTypeModal from '@/components/appointments/SelectAppointmentInspectionTypeModal/index.vue';
import SelectOrCreateServiceCaseModal from '@/components/appointments/SelectOrCreateServiceCaseModal/index.vue';

export default {
  name: 'AppointmentCard',
  components: { AppointmentStatusTag },
  emits: ['update:data'],
  props: {
    data: [Appointment, Object],
  },
  data() {
    return {
      loading: {
        [Appointment.enum.statuses.Created]: false,
        [Appointment.enum.statuses.Waiting]: false,
        [Appointment.enum.statuses.Canceled]: false,
        [Appointment.enum.statuses.InProgress]: false,
        [Appointment.enum.statuses.Approved]: false,
        [Appointment.enum.statuses.Provided]: false,
      },
      hasLoadingState: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    isDoctor() {
      return this.user.role === User.enum.roles.Doctor;
    },

    patientPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.path,
        params: { id: this.data.patient_id },
      });
    },
    infoItems() {
      return [
        {
          label: this.$t('Appointments.StartDate'),
          value: Appointment.getStartDate(this.data.start_at || ''),
        },
        {
          label: this.$t('Appointments.StartTime'),
          value: Appointment.getStartTime(this.data.start_at || ''),
        },
        {
          label: this.$t('Base.Doctor'),
          value: this.data.doctor.name,
        },
        {
          label: this.$t('Base.Service'),
          value: this.data.service.title,
        },
        {
          label: this.$t('Base.Price'),
          value:
            PriceService.formatPrice({ price: this.data.service.price }) +
            ' ' +
            this.$t('Base.Sum'),
        },
      ];
    },
  },

  methods: {
    async editAppointment() {
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          data: this.data,
        },
      });

      if (action instanceof GlobalDrawerCloseAction) return;
      this.$emit('update:data', action.data.appointment);
    },

    async updateStatus(status) {
      if (this.hasLoadingState) return;
      this.loading[status] = true;
      this.hasLoadingState = true;

      try {
        if (this.isDoctor && status === Appointment.enum.statuses.Provided)
          await this.startDoctorApproveFlow();

        // const { data } = await Appointment.updateStatus({
        //   id: this.data.id,
        //   status: status,
        // });
        //
        // this.$emit('update:data', data.data);
        // this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessUpdated') });
        // this.redirectIfNeeded(status);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading[status] = false;
      this.hasLoadingState = false;
    },
    redirectIfNeeded(status) {
      if (
        status !== Appointment.enum.statuses.Waiting &&
        status !== Appointment.enum.statuses.InProgress &&
        this.user.role === User.enum.roles.Doctor
      ) {
        this.$router.push({
          name: DOCTORS_QUEUE_ROUTE.name,
        });
      }
    },

    async startDoctorApproveFlow() {
      if (!this.data.patient.has_treatment) return this.startFullApproveFlow();
      const action = await this.$store.dispatch(
        'modalAndDrawer/openModal',
        SelectAppointmentInspectionTypeModal
      );

      if (action.name === Appointment.enum.inspectionTypes.Full) await this.startFullApproveFlow();
      if (action.name === Appointment.enum.inspectionTypes.Treatment)
        await this.startTreatmentApproveFlow();
    },

    async startFullApproveFlow() {
      this.$notify({ type: 'info', title: 'full flow' });

      const success = await this.selectOrCreateServiceCase();
      if (!success) return this.$emit('update:modelValue', false);

      // other code
    },
    async startTreatmentApproveFlow() {
      this.$notify({ type: 'info', title: 'treatment flow' });
    },

    /**
     * Возращает
     *   true - если успешно установлен service_case,
     *   false - модалка закрылась и нужно приостановить текщий flow
     * @return {Promise<boolean>}
     */
    async selectOrCreateServiceCase() {
      if (this.data.service_case_id) return true;

      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: SelectOrCreateServiceCaseModal,
        payload: {
          userId: this.data.patient_id,
          appointmentId: this.data.id,
        },
      });
      if (!(action instanceof GlobalModalCloseAction)) {
        this.$emit('update:data', action.data.appointment);
      }

      return !(action instanceof GlobalModalCloseAction);
    },
  },

  setup: () => ({
    Appointment,
    User,
  }),
};
