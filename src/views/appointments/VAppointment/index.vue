<template>
  <LayoutByUserRole content-class="v-appointment-content" :loading="loading.get">
    <RouterView
      v-if="appointment"
      v-model:appointment="appointment"
      @status:update="updateStatus"
      @appointment:edit="editAppointment"
      @appointment:provide="provideAppointment"
      @appointment:set:diagnose="setDiagnosis">
    </RouterView>
  </LayoutByUserRole>
</template>

<script>
import { mapState } from 'vuex';
import { DOCTORS_QUEUE_ROUTE } from '@/router/doctors.routes';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import { User } from '@/models/User.model';
import { Appointment } from '@/models/Appointment.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

import LayoutByUserRole from '@/components/layouts/LayoutByUserRole/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import SelectAppointmentInspectionTypeModal from '@/components/appointments/SelectAppointmentInspectionTypeModal/index.vue';
import SelectOrCreateServiceCaseModal from '@/components/appointments/SelectOrCreateServiceCaseModal/index.vue';
import SuggestControlAppointmentModal from '@/components/appointments/SuggestControlAppointmentModal/index.vue';
import SelectTreatmentModal from '@/components/appointments/SelectTreatmentModal/index.vue';
import SuggestTreatmentModal from '@/components/appointments/SuggestTreatmentModal/index.vue';
import CreateTreatmentModal from '@/components/treatment/CreateTreatmentModal/index.vue';

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

      /** @type {Appointment} */
      appointment: null,
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

    /**
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
          await this.startDoctorProvideFlow();
        } else {
          const { data } = await Appointment.updateStatus({
            id: this.appointment.id,
            status: status,
          });

          this.appointment = data.data;
          this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessUpdated') });
          this.redirectIfNeeded(status);
        }
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
      if ([Appointment.enum.statuses.Canceled].includes(status)) {
        this.$router.push({
          name: DOCTORS_QUEUE_ROUTE.name,
        });
      }
    },

    async startDoctorProvideFlow() {
      if (!this.appointment.patient.has_treatment || this.appointment.service_case_id)
        return this.startFullProvideFlow();
      if (this.appointment.treatment_id) return this.startTreatmentProvideFlow();

      const action = await this.$store.dispatch(
        'modalAndDrawer/openModal',
        SelectAppointmentInspectionTypeModal
      );

      if (action.name === Appointment.enum.inspectionTypes.Full) await this.startFullProvideFlow();
      if (action.name === Appointment.enum.inspectionTypes.Treatment)
        await this.startTreatmentProvideFlow();
    },

    async startFullProvideFlow() {
      const success = await this.selectOrCreateServiceCase();
      if (!success) return;

      this.$router.push({
        name: APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_INSPECTION_CARD.name,
        params: {
          id: this.appointment.id,
        },
      });
    },
    async startTreatmentProvideFlow() {
      const success = await this.selectTreatment();
      if (!success) return;

      this.$router.push({
        name: APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_TREATMENT_CARD.name,
        params: {
          id: this.appointment.id,
        },
      });
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
        component: SelectOrCreateServiceCaseModal,
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

    /**
     * Возращает
     *   true - если успешно выбрано лечение,
     *   false - модалка закрылась и нужно приостановить текщий flow
     * @return {Promise<boolean>}
     */
    async selectTreatment() {
      if (this.appointment.treatment_id) return true;

      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: SelectTreatmentModal,
        payload: {
          appointment: this.appointment,
        },
      });
      if (!(action instanceof GlobalModalCloseAction)) {
        this.$emit('update:appointment', action.data.appointment);
      }

      return !(action instanceof GlobalModalCloseAction);
    },

    setDiagnosis() {},

    async provideAppointment() {
      this.$router.push({
        name: APPOINTMENT_ROUTE.childrenMap.APPOINTMENT_ROUTE_DEFAULT_CARD.name,
        params: {
          id: this.appointment.id,
        },
      });

      await this.updateStatus(Appointment.enum.statuses.Provided, { forceUpdate: true });
      // иначе не открываются модалки по след. флоу
      setTimeout(async () => this.startAfterProvideFlow());
    },

    async startAfterProvideFlow() {
      const successControlAppointment = await this.suggestControlAppointment();

      if (!this.appointment.treatment_id) {
        const successTreatment = await this.suggestTreatment();

        if (successTreatment) {
          await this.createTreatment();
        }
      }

      this.$router.push(DOCTORS_QUEUE_ROUTE.path);
    },

    /**
     * Возращает
     *   true - если успешно создан контрольынй приём
     *   false - модалка закрылась или выбрали "пропустить"
     * @return {Promise<boolean>}
     */
    async suggestControlAppointment() {
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: SuggestControlAppointmentModal,
        payload: {
          doctor: this.appointment.doctor,
          patient: this.appointment.patient,
        },
      });

      return !(action instanceof GlobalModalCloseAction);
    },

    /**
     * Возращает
     *   true - нужно создать лечение
     *   false - модалка закрылась или выбрали "пропустить"
     * @return {Promise<boolean>}
     */
    async suggestTreatment() {
      // if(this.appointment.treatment_id) return false

      const action = await this.$store.dispatch('modalAndDrawer/openModal', SuggestTreatmentModal);
      return !(action instanceof GlobalModalCloseAction);
    },

    /**
     * Возращает
     *   true - если создано лечение
     *   false - модалка закрылась(отмена)
     * @return {Promise<boolean>}
     */
    async createTreatment() {
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateTreatmentModal,
        payload: {
          appointment: this.appointment,
        },
      });

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
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
