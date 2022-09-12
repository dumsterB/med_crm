<template>
  <!--  Patient  -->
  <div class="v-patient-default__item v-patient-default-item">
    <div class="v-patient-default-item__header v-patient-default-item-header">
      <div class="v-patient-default__title">{{ $t('Title') }}</div>
    </div>

    <div class="v-patient-default-item__body">
      <PatientCard
        :data="patient"
        type="horizontal"
        @update:data="$emit('update:patient', $event)"
        @create:treatment="$emit('treatment:create', $event)" />
    </div>
  </div>

  <!--  Children  -->
  <div v-show="!isChildren" class="v-patient-default-item">
    <div class="v-patient-default-item__header v-patient-default-item-header">
      <div class="v-patient-default__title">{{ $t('User.Children') }}</div>
      <ElButton type="primary" @click="$emit('patient:createChildren')">
        {{ $t('User.AddChildren') }}
      </ElButton>
    </div>

    <ElEmpty
      class="v-patient-default-item-empty"
      v-show="!patient.childrens?.length"
      :description="$t('Base.NoData')" />

    <div class="v-patient-default-item__body" v-if="patient.childrens?.length">
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
  <div class="v-patient-default-item">
    <div class="v-patient-default-item__header v-patient-default-item-header">
      <div class="v-patient-default__title">{{ $t('Appointments.Appointments') }}</div>
      <ElButton type="primary" @click="$emit('appointment:create')">
        {{ $t('Appointments.CreateAppointment') }}
      </ElButton>
    </div>

    <ElEmpty
      class="v-patient-default-item-empty"
      v-show="!appointments?.length && !loading.appointment"
      :description="$t('Base.NoData')" />

    <div class="v-patient-default-item__body" v-if="appointments?.length">
      <AppointmentsTable
        :total="appointments?.length"
        :perPage="appointments?.length"
        :page="1"
        :items="appointments" />
    </div>
  </div>

  <!--  Treatments  -->
  <div class="v-patient-default__item v-patient-default-item">
    <div class="v-patient-default-item__header v-patient-default-item-header">
      <div class="v-patient-default__title">{{ $t('Base.TableTreatment') }}</div>
      <ElButton type="primary" @click="$emit('treatment:create')">
        {{ $t('Base.SetTreatment') }}
      </ElButton>
    </div>

    <ElEmpty
      class="v-patient-default-item-empty"
      v-show="!treatments?.length && !loading.treatments"
      :description="$t('Base.NoData')" />

    <div class="v-patient-default-item__body" v-if="treatments?.length">
      <TreatmentsTable
        :total="treatments?.length"
        :perPage="treatments?.length"
        :page="1"
        :items="treatments"
        @item:update="$emit('treatment:updated', $event)" />
    </div>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { Patient } from '@/models/Patient.model';

import PatientCard from '@/components/views/VPatient/PatientCard/index.vue';
import AppointmentsTable from '@/components/appointments/AppointmentsTable/index.vue';
import PatientsTable from '@/components/patients/PatientsTable/index.vue';
import TreatmentsTable from '@/components/treatments/TreatmentsTable/index.vue';

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
    PatientCard,
    AppointmentsTable,
    PatientsTable,
    TreatmentsTable,
  },
  icons: icons,
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
    isChildren() {
      return !!this.patient.parent_id;
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