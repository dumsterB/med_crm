<template>
  <div class="patients-table-wrapper">
    <ElScrollbar class="patients-table-wrapper__scrollbar">
      <ElTable
        class="patients-table">
      </ElTable>
    </ElScrollbar>

<!--    <ElPagination-->
<!--      class="patients-table-wrapper__pagination"-->
<!--      :current-page="page"-->
<!--      :page-count="pageCount"-->
<!--      :page-size="perPage"-->
<!--      :page-sizes="pageSizes"-->
<!--      :total="total"-->
<!--      background-->
<!--      hide-on-single-page-->
<!--      layout="prev, pager, next, sizes"-->
<!--      @update:current-page="$emit('update:page', $event)"-->
<!--      @update:page-size="$emit('update:perPage', $event)" />-->
  </div>
</template>

<script>
import { REGISTRY_PATIENT_ROUTE } from '@/router/registry.routes';
import * as icons from '@/enums/icons.enum.js';
import { PAGE_SIZES } from '@/config/ui.config';
import { Patient } from '@/models/Patient.model';

import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';

export default {
  name: 'PatientsTable',
  emits: ['update:perPage', 'update:page'],
  props: {
    /**
     * @param { Array<Patient|object> } items
     */
  },
  icons: icons,
  computed: {

  },
  watch: {
  },

  methods: {
    goToPatient(payload) {
      this.$router.push({
        name: REGISTRY_PATIENT_ROUTE.name,
        params: { id: payload.id },
      });
    },

    makeAppointment(payload) {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          patient: payload,
        },
      });
    },
    addPatient() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: {
          nameOrPhone: this.search,
        },
      });
    },

    addChildren(payload) {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: {
          data: new Patient({ parent: payload, parent_id: payload.id }),
        },
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
