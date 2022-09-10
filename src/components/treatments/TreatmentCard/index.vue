<template>
  <TreatmentsTable
    class="treatment-card"
    :items="[...(data ? [data] : [])]"
    :loading="loading"
    :page="1"
    :per-page="1"
    :total="1" />
</template>

<script>
import { Treatment } from '@/models/Treatment.model';
import TreatmentsTable from '@/components/treatments/TreatmentsTable/index.vue';

export default {
  name: 'TreatmentCard',
  components: {
    TreatmentsTable,
  },

  props: {
    data: [Treatment, Object],
    loading: Boolean,
  },
  methods: {
    goToPatient() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
