<template>
  <ElTag :type="options.type" round effect="dark">
    {{ options.label }}
  </ElTag>
</template>

<script>
import { Treatment } from '@/models/Treatment.model';

export default {
  name: 'TreatmentStatusTag',
  props: {
    status: String,
  },
  computed: {
    options() {
      return {
        type: this.status === Treatment.enum.statuses.Closed ? 'success' : '',
        label: this.$t(`Treatments.Statuses.${this.status}`),
      };
    },
  },
};
</script>

<i18n src="@/locales/treatments.locales.json" />
