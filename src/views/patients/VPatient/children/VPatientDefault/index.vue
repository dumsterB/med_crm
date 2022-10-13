<template>
  <!--  Patient  -->
  <div class="v-patient-default__item v-patient-default-item">
    <div class="v-patient-default-item__header v-patient-default-item-header">
      <div class="v-patient-default__title">{{ $t('Title') }}</div>
      <div class="v-patient-default_-actions">
        <ElButton type="primary" plain @click="editPatient">
          {{ $t('Patients.EditPatient') }}
        </ElButton>
      </div>
    </div>

    <div class="v-patient-default-item__body" v-loading="loading.profile">
      <PatientCardRow :patient="patient" :items="patientItems" shadow="never">
        <template #actions>
          <router-link :to="patientAmbulatoryCardPageLink">
            <ElButton type="primary">{{ $t('Base.AmbulatoryCard') }}</ElButton>
          </router-link>
        </template>
      </PatientCardRow>
    </div>
  </div>

  <!--  Children  -->
  <div v-show="!isChildren" class="v-patient-default-item">
    <div class="v-patient-default-item__header v-patient-default-item-header">
      <div class="v-patient-default__title">{{ $t('User.Children') }}</div>
      <ElButton type="primary" plain @click="$emit('patient:createChildren')">
        {{ $t('User.AddChildren') }}
      </ElButton>
    </div>

    <ElEmpty
      class="v-patient-default-item-empty"
      v-show="!patient.childrens?.length"
      :description="$t('Base.NoData')" />

    <PatientsTable
      v-if="patient?.childrens?.length || loading.profile"
      :items="patient.childrens"
      :loaing="loading.profile"
      :total="patient?.childrens?.length"
      :perPage="patient?.childrens?.length"
      :page="1"
      hide-on-single-page
      :loading="loading.profile"
      max-height="500px"
      layout="prev, pager, next, sizes" />
  </div>

  <!--  Appointments  -->
  <div class="v-patient-default-item">
    <div class="v-patient-default-item__header v-patient-default-item-header">
      <div class="v-patient-default__title">{{ $t('Appointments.Appointments') }}</div>
      <ElButton type="primary" plain @click="$emit('appointment:create')">
        {{ $t('Appointments.CreateAppointment') }}
      </ElButton>
    </div>

    <ElEmpty
      class="v-patient-default-item-empty"
      v-show="!appointments?.length && !loading.appointment"
      :description="$t('Base.NoData')" />

    <AppointmentsTable
      v-if="appointments?.length || loading.appointment"
      :items="appointments"
      :total="appointments?.length"
      :perPage="appointments?.length"
      :page="1"
      :loading="loading.appointment"
      max-height="500px" />
  </div>

  <!--  Treatments  -->
  <div class="v-patient-default__item v-patient-default-item">
    <div class="v-patient-default-item__header v-patient-default-item-header">
      <div class="v-patient-default__title">{{ $t('Base.TableTreatment') }}</div>

      <ElButton v-show="isDoctor" plain type="primary" @click="$emit('treatment:create')">
        {{ $t('Base.SetTreatment') }}
      </ElButton>
    </div>

    <ElEmpty
      class="v-patient-default-item-empty"
      v-show="!treatments?.length && !loading.treatments"
      :description="$t('Base.NoData')" />

    <TreatmentsTable
      v-if="treatments?.length || loading.treatments"
      :items="treatments"
      :total="treatments?.length"
      :perPage="treatments?.length"
      :page="1"
      :loading="loading.treatments"
      max-height="500px"
      @item:update="$emit('treatment:updated', $event)" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { insertRouteParams } from '@/utils/router.utils';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { Patient } from '@/models/Patient.model';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

import AppointmentsTable from '@/components/appointments/AppointmentsTable/index.vue';
import PatientsTable from '@/components/patients/PatientsTable/index.vue';
import TreatmentsTable from '@/components/treatments/TreatmentsTable/index.vue';
import PatientCardRow from '@/components/patients/PatientCardRow/index.vue';
import CreateOrEditPatientModal from '@/components/patients/CreateOrEditPatientModal/index.vue';

export default {
  name: 'VPatientDefault',
  emits: [
    'update:patient',
    'appointment:create',
    'patient:createChildren',
    'treatment:create',
    'treatment:updated',
  ],
  components: {
    AppointmentsTable,
    PatientsTable,
    TreatmentsTable,
    PatientCardRow,
  },
  props: {
    patient: [Patient, Object],

    /** @param {Array<Appointment>} appointments */
    appointments: Array,
    /** @param {Array<Treatment>} treatments */
    treatments: Array,

    /** @param {{profile: boolean, appointment: boolean}} loading */
    loading: Object,
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    isDoctor() {
      return !!this.user.doctor_id;
    },

    isChildren() {
      return !!this.patient.parent_id;
    },
    patientItems() {
      return [
        {
          label: this.$t('User.Phone'),
          value: this.patient.phone,
        },
        {
          label: this.$t('User.Birthdate'),
          value: this.patient.birthdate,
        },
        {
          label: this.$t('User.Gender'),
          value: this.patient.gender ? this.$t('User.Genders.' + this.patient.gender) : null,
        },
      ];
    },
    patientAmbulatoryCardPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.childrenMap.PATIENT_ROUTE_AMBULATORY_CARD._fullPath,
        params: {
          id: this.patient.id,
        },
      });
    },
  },

  methods: {
    async editPatient() {
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateOrEditPatientModal,
        payload: {
          data: this.patient,
        },
      });

      if (action instanceof GlobalModalCloseAction) return;
      this.$emit('update:patient', action.data.patient);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
