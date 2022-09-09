<template>
  <LayoutDoctor fixHeight>
    <LayoutContentHeader>
      <ElPageHeader class="v-patient-treatment-header" :title="$t('Base.Back')" @back="goToPatient">
        <template #content>
          <div class="v-patient-ambulatory-header-info" v-if="treatment">
            {{ treatment.title }}
          </div>
        </template>
      </ElPageHeader>
    </LayoutContentHeader>

    <TreatmentCard :data="[treatment]" :loading="loading.treatment" />

    <div class="v-patient-default__title">{{ $t('Base.TableReception') }}</div>

    <ElEmpty
      class="v-patient-treatment-item-empty"
      v-show="!reception?.length && !loading.reception"
      :description="$t('Base.NoData')" />
    <ReceptionTable v-if="reception?.length" :data="reception" :loading="loading.reception" />
  </LayoutDoctor>
</template>

<script>
import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import LayoutDoctor from '@/components/layouts/LayoutDoctor/index.vue';
import { Treatment } from '@/models/Treatment.model';
import TreatmentCard from '@/components/views/TreatmentCard/index.vue';
import ReceptionTable from '@/components/treatments/ReceptionTable/index.vue';
import { Appointment } from '@/models/Appointment.model';
export default {
  name: 'VTreatment',
  components: {
    LayoutContentHeader,
    LayoutDoctor,
    TreatmentCard,
    ReceptionTable,
  },
  data() {
    return {
      loading: {
        treatment: false,
        reception: false,
      },
      treatment: null,
      reception: null,
    };
  },
  props: {
    id: [Number, String],
  },
  watch: {
    id: {
      async handler() {
        await this.getTreatment();
        await this.getReception();
      },
      immediate: true,
    },
  },
  methods: {
    goToPatient() {
      this.$router.go(-1);
    },
    async getTreatment() {
      this.loading.treatment = true;

      const { data } = await Treatment.findTreatmentById(this.id);

      this.treatment = data.data;
      this.loading.treatment = false;
    },
    async getReception() {
      this.loading.reception = true;

      const { data } = await Appointment.find({
        search: this.id,
        query_field: 'treatment_id',
        query_type: 'EQUALS',
      });

      this.reception = data.data;
      this.loading.reception = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
