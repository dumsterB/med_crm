<template>
  <LayoutRegistry :loading="loading.profile" content-class="v-patients-content">
    <div class="v-patients-content__header v-patients-content-header">
      <div class="v-patients-content-header-info">
        <p class="v-patients-content-header__text">{{ $t('PatientInfo') }}</p>
      </div>
      <div class="v-patients-content-header-actions">
        <ElButton type="primary" @click="editPatient"> {{ $t('Patients.EditPatient') }} </ElButton>
      </div>
    </div>
    <div v-if="patient" class="v-patients-content">
      <div class="v-patients-content-profile">
        <ProfileCard :data="patient"></ProfileCard>
      </div>
      <p class="v-patients-content-description__title">{{ $t('Appointments') }}</p>
      <div class="v-patients-content-appointments">
        <AppointmentCard :data="appointments"></AppointmentCard>
      </div>
    </div>
  </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import ProfileCard from '@/components/views/VPatient/ProfileCard/index.vue';
import AppointmentCard from '@/components/views/VPatient/AppointmentCard/index.vue';
import { Patient } from '@/models/Patient.model';
import { Appointment } from '@/models/Appointment.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import * as icons from '@/enums/icons.enum.js';


export default {
  name: 'VPatient',
  components: { LayoutRegistry, ProfileCard, AppointmentCard },
  icons: icons,
  props: {
    id: [Number, String],
  },
  data() {
    return {
      /**
       * @type Patient
       * @type Appointment
       */
      appointments: null,
      patient: null,
      loading: {
        profile: false,
        appointment: false,
      },
    };
  },
  watch: {
    id: {
      async handler() {
        await this.getUser();
        this.getAppointments();
      },
      immediate: true,
    },
  },

  methods: {
    async getUser() {
      this.loading.profile = true;

      const { data } = await Patient.findOneById(this.id);
      this.patient = data.data;

      this.loading.profile = false;
    },

    async getAppointments() {
      this.loading.appointment = true;

      if (this.patient) {
        const { data } = await Appointment.find({
          user_id: this.patient.id,
          query_type: 'EQUALS',
          search: this.patient.id,
          page: 1,
          per_page: 100,
        });
        this.appointments = data.data;
      }

      this.loading.appointment = false;
    },

    async editPatient() {
      this.loading.profile = true;
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: { data: this.patient },
      });

      if (action instanceof GlobalDrawerCloseAction) return;
      this.patient = action.data.patient;
      this.loading.profile = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
