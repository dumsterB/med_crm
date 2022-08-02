<template>
  <tr
    :class="['patient-row', { 'patient-row_has-child': patient.childrens_count }]"
    @click="goToPatient">
    <td>
      <div class="patient-row__main">
        <UiAvatar :img="patient.avatar" />
        <span>{{ patient.name }}</span>
      </div>
    </td>
    <td>{{ patient.phone }}</td>
  </tr>

  <tr v-if="patient.childrens_count">
    <td class="patient-row__childrens" colspan="2">
      <table>
        <PatientRow v-for="children in patient.childrens" :key="children.id" :patient="children" />
      </table>
    </td>
  </tr>
</template>

<script>
import { Patient } from '@/models/Patient.model';
import { REGISTRY_PATIENT_ROUTE } from '@/router/registry.routes';

export default {
  name: 'PatientRow',
  props: {
    patient: [Patient, Object],
  },

  methods: {
    goToPatient() {
      this.$router.push({
        name: REGISTRY_PATIENT_ROUTE.name,
        params: { id: this.patient.id },
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
