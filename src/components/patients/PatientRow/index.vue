<template>
  <tr class="patient-row" @click="goToPatient">
    <td>
      <div class="patient-row__main">
        <UiAvatar :img="patient.avatar" />
        <span>{{ patient.name }}</span>
      </div>
    </td>
    <td>{{ patient.phone }}</td>
  </tr>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { Patient } from '@/models/Patient.model';
import { REGISTRY_PATIENT_ROUTE } from '@/router/registry.routes';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
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
