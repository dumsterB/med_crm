<template>
  <LayoutRegistry
    :loading="loading.profile || loading.appointment"
    content-class="v-patient-content">
    <template v-if="patient">
      <!--  Patient  -->
      <div class="v-patient-content__item v-patient-content-item">
        <div class="v-patient-content-item__header v-patient-content-item-header">
          <div class="v-patient-content__title">{{ $t('Title') }}</div>
        </div>

        <div class="v-patient-content-item__body">
          <PatientCard v-model:data="patient" type="horizontal" />
        </div>
      </div>

      <!--  Children  -->
      <div v-show="!isChildren" class="v-patient-content-item">
        <div class="v-patient-content-item__header v-patient-content-item-header">
          <div class="v-patient-content__title">{{ $t('User.Children') }}</div>
          <ElButton type="primary" @click="createChildren"> {{ $t('User.AddChildren') }}</ElButton>
        </div>

        <ElEmpty class="v-patient-content-item-empty" v-show="!patient.childrens?.length" :description="$t('Base.NoData')" />

        <div class="v-patient-content-item__body" v-if="patient.childrens?.length">
          <PatientsTable
            :total="patient?.childrens?.length"
            :perPage="patient?.childrens?.length"
            :page="1"
            background
            hide-on-single-page
            layout="prev, pager, next, sizes"
            :items="patient.childrens"></PatientsTable>
        </div>
      </div>

      <!--  Appointments  -->
      <div class="v-patient-content-item">
        <div class="v-patient-content-item__header v-patient-content-item-header">
          <div class="v-patient-content__title">{{ $t('Appointments.Appointments') }}</div>
          <ElButton type="primary" @click="createAppointment">
            {{ $t('Appointments.CreateAppointment') }}
          </ElButton>
        </div>

        <ElEmpty
          class="v-patient-content-item-empty"
          v-show="!appointments?.length && !loading.appointment"
          :description="$t('Base.NoData')" />

        <div class="v-patient-content-item__body" v-if="appointments?.length">
          <AppointmentsTable
            :total="appointments?.length"
            :perPage="appointments?.length"
            :page="1"
            :items="appointments"></AppointmentsTable>
        </div>
      </div>
    </template>
  </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import PatientCard from '@/components/views/VPatient/PatientCard/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import { Patient } from '@/models/Patient.model';
import { Appointment } from '@/models/Appointment.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import AppointmentsTable from '@/components/appointments/AppointmentsTable/index.vue';
import PatientsTable from '@/components/patients/PatientsTable/index.vue';
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'VPatient',
  components: {
    LayoutRegistry,
    PatientCard,
    AppointmentsTable,
    PatientsTable,
  },
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
  computed: {
    isChildren() {
      return !!this.patient.parent_id;
    },
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

      const { data } = await Appointment.find({
        query_type: 'EQUALS',
        search: this.patient.id,
        query_field: 'user_id',
        page: 1,
        per_page: 100,
      });
      this.appointments = data.data;

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

    createChildren() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: {
          data: new Patient({ parent: this.patient, parent_id: this.patient.id }),
        },
      });
    },
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
