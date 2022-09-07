<template>
  <LayoutByUserRole content-class="v-appointment-content" :loading="loading.get">
    <RouterView
      v-model:appointment="appointment"
      @status:update="updateStatus"
      @appointment:edit="editAppointment">
    </RouterView>
  </LayoutByUserRole>
</template>

<script>
import { mapState } from 'vuex';
import { DOCTORS_QUEUE_ROUTE } from '@/router/doctors.routes';
import { User } from '@/models/User.model';
import { Appointment } from '@/models/Appointment.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

import LayoutByUserRole from '@/components/layouts/LayoutByUserRole/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import SelectAppointmentInspectionTypeModal from '@/components/appointments/SelectAppointmentInspectionTypeModal/index.vue';
import SelectOrCreateDefaultServiceCaseModal from '@/components/appointments/SelectOrCreateDefaultServiceCaseModal/index.vue';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';

export default {
  name: 'VAppointment',
  components: { LayoutByUserRole },
  props: {
    id: [Number, String],
    patientId: [Number, String],
  },
  data() {
    return {
      loading: {
        get: false,
        [Appointment.enum.statuses.Created]: false,
        [Appointment.enum.statuses.Waiting]: false,
        [Appointment.enum.statuses.Canceled]: false,
        [Appointment.enum.statuses.InProgress]: false,
        [Appointment.enum.statuses.Approved]: false,
        [Appointment.enum.statuses.Provided]: false,
      },
      hasStatusLoadingState: false,
      appointment: new Appointment(),
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    isDoctor() {
      return this.user.role === User.enum.roles.Doctor;
    },
  },
  watch: {
    id: {
      handler() {
        this.getAppointment();
      },
      immediate: true,
    },
  },

  methods: {
    async getAppointment() {
      this.loading.get = true;

      const { data } = await Appointment.findOneById(this.id);
      this.appointment = data.data;

      this.loading.get = false;
    },

    async editAppointment() {
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          data: this.appointment,
        },
      });

      if (action instanceof GlobalDrawerCloseAction) return;
      this.appointment = action.data.appointment;
    },

    approveAppointment() {
      this.updateStatus(Appointment.enum.statuses.Approved, { forceUpdate: true });
    },

    /**
     *
     * @param {string} status
     * @param {object} options
     * @param {boolean} options.forceUpdate проигнорирует бизнес логику и обновит статус
     * @return {Promise<void>}
     */
    async updateStatus(status, options = {}) {
      if (this.hasStatusLoadingState) return;
      this.loading[status] = true;
      this.hasStatusLoadingState = true;

      try {
        if (
          !options.forceUpdate &&
          this.isDoctor &&
          status === Appointment.enum.statuses.Provided
        ) {
          await this.startDoctorApproveFlow();
        }

        // const { data } = await Appointment.updateStatus({
        //   id: this.appointment.id,
        //   status: status,
        // });
        //
        // this.appointment = data.data;
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
      this.hasStatusLoadingState = false;
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
      if (!this.appointment.patient.has_treatment || this.appointment.service_case_id)
        return this.startFullApproveFlow();

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

      this.$router.push({
        name: APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_INSPECTION_CARD.name,
        params: {
          id: this.appointment.id,
        },
      });

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
      if (this.appointment.service_case_id) return true;

      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: SelectOrCreateDefaultServiceCaseModal,
        payload: {
          userId: this.appointment.patient_id,
          appointmentId: this.appointment.id,
        },
      });
      if (!(action instanceof GlobalModalCloseAction)) {
        this.$emit('update:appointment', action.data.appointment);
      }

      return !(action instanceof GlobalModalCloseAction);
    },
  },

  setup: () => ({
    User,
    Appointment,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
