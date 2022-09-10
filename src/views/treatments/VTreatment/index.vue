<template>
  <LayoutDoctor fixHeight>
    <LayoutContentHeader>
      <ElPageHeader class="v-patient-treatment-header" :title="$t('Base.Back')" @back="goToPatient">
        <template #content>
          <div class="v-patient-ambulatory-header-info" v-if="treatment">
            <RouterLink :to="patientPageLink">
              <ElButton type="primary" text> {{ treatment?.user?.name }}</ElButton>
            </RouterLink>
          </div>
        </template>
      </ElPageHeader>
    </LayoutContentHeader>

    <TreatmentCard :data="treatment" :loading="loading.treatment" />
    <div class="v-patient-default__title">{{ $t('Base.TableReception') }}</div>

    <ElEmpty
      class="v-patient-treatment-item-empty"
      v-show="!receptions?.length && !loading.reception"
      :description="$t('Base.NoData')" />
    <ReceptionTable v-if="receptions?.length" :data="receptions" :loading="loading.reception" />
  </LayoutDoctor>
</template>

<script>
import { Treatment } from '@/models/Treatment.model';
import { Appointment } from '@/models/Appointment.model';
import { insertRouteParams } from '@/utils/router.utils';
import { PATIENT_ROUTE } from '@/router/patients.routes';

import TreatmentCard from '@/components/views/TreatmentCard/index.vue';
import ReceptionTable from '@/components/treatments/AppointmentsByTreatmentTable/index.vue';
import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import LayoutDoctor from '@/components/layouts/LayoutDoctor/index.vue';

export default {
  name: 'VTreatment',
  components: {
    LayoutContentHeader,
    LayoutDoctor,
    TreatmentCard,
    ReceptionTable,
  },
  props: {
    id: [Number, String],
  },
  data() {
    return {
      loading: {
        treatment: false,
        reception: false,
      },
      /** @type {Treatment} */
      treatment: null,
      /** @type {Array<Appointment>} */
      receptions: null,
    };
  },
  computed: {
    patientPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.path,
        params: { id: this.treatment.user_id },
      });
    },
  },

  watch: {
    id: {
      async handler() {
        await this.getTreatment();
        await this.getReceptions();
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

      const { data } = await Treatment.findById(this.id);

      this.treatment = data.data;
      this.loading.treatment = false;
    },
    async getReceptions() {
      this.loading.reception = true;

      const { data } = await Appointment.find({
        search: this.id,
        query_field: 'treatment_id',
        query_type: 'EQUALS',
      });

      this.receptions = data.data;
      this.loading.reception = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
