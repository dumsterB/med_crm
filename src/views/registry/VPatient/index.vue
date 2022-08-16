<template>
  <LayoutRegistry :loading="loading.profile" content-class="v-patient-content">
    <template v-if="patient">
      <div class="v-patient-content__item v-patient-content-item">
        <div class="v-patient-content-item__header v-patient-content-item-header">
          <div class="v-patient-content__title">{{ $t('Title') }}</div>
          <ElButton type="primary" @click="editPatient">
            {{ $t('Patients.EditPatient') }}
          </ElButton>
        </div>

        <div class="v-patient-content-item__body">
          <PatientCard :data="patient" type="horizontal" />
        </div>
      </div>

      <div class="v-patient-content-item">
        <div class="v-patient-content-item__header v-patient-content-item-header">
          <div class="v-patient-content__title">{{ $t('User.Children') }}</div>
          <ElButton type="primary" @click="createChildren"> {{ $t('User.AddChildren') }} </ElButton>
        </div>

        <ElEmpty v-show="!patient.childrens?.length" :description="$t('Base.NoData')" />
        <div
          class="v-patient-content-item__body v-patient-content-item-body v-patient-content-item-body_grid">
          <PatientCard
            v-for="children in patient.childrens || []"
            :key="children.id"
            type="vertical"
            :data="{ ...children, parent: patient }" />
        </div>
      </div>

      <div class="v-patient-content-item">
        <div class="v-patient-content-item__header v-patient-content-item-header">
          <div class="v-patient-content__title">{{ $t('Appointments.Appointments') }}</div>
          <ElButton type="primary" @click="createAppointment">
            {{ $t('Appointments.CreateAppointment') }}
          </ElButton>
        </div>

        <ElEmpty
          v-show="!appointments?.length && !loading.appointment"
          :description="$t('Base.NoData')" />
        <div
          class="v-patient-content-item__body v-patient-content-item-body v-patient-content-item-body_grid">
          <AppointmentCard
            v-for="appointment in appointments || []"
            :key="appointment.id"
            :data="appointment" />
        </div>
      </div>
    </template>
  </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import PatientCard from '@/components/views/VPatient/PatientCard/index.vue';
import AppointmentCard from '@/components/views/VPatient/AppointmentCard/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import { Patient } from '@/models/Patient.model';
import { Appointment } from '@/models/Appointment.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'VPatient',
  components: { LayoutRegistry, PatientCard, AppointmentCard },
  icons: icons,
  props: {
    id: [Number, String],
  },
  data() {
    return {
      /** @type Array<Appointment> */
      appointments: null,
      /** @type Patient */
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
    createAppointment() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          patient: this.patient,
        },
      });
    },

    async editPatient() {
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: { data: this.patient },
      });

      if (action instanceof GlobalDrawerCloseAction) return;
      this.patient = action.data.patient;
    },

    createChildren() {},
  },

  setup: () => ({
    emptyAppointment: new Appointment(),
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
