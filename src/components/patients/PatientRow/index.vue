<template>
  <tr class="patient-row">
    <td>Avatar</td>
    <td>{{ patient.name }}</td>
    <td>{{ patient.phone }}</td>
  </tr>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { Patient } from '@/models/Patient.model';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  props: {
    patient: [Patient, Object],
  },
};
</script>

<style lang="scss" src="./index.scss" />
