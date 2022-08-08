<template>
  <div class="patients-table-wrapper">
    <ElScrollbar class="patients-table-wrapper__scrollbar">
      <ElTable
        class="patients-table"
        :data="items"
        v-loading="loading"
        ref="elTable"
        @row-click="goToPatient">
        <template #empty>
          <div class="patients-table__empty patients-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
            <ElButton type="primary" @click="addPatient">
              {{ $t('Patients.AddPatient') }}
            </ElButton>
          </div>
        </template>

        <ElTableColumn prop="name" :label="$t('User.FullName')">
          <template #default="{ row }">
            <div class="patients-table__name-avatar">
              <UiAvatar :image="row.avatar" />
              <span> {{ row.name }} </span>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="gender" :label="$t('User.Gender')">
          <template #default="{ row }">
            {{ row.gender ? $t(`User.Genders.${row.gender}`) : '' }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="phone" :label="$t('User.Phone')"></ElTableColumn>
        <ElTableColumn prop="age" :label="$t('User.Age')"> </ElTableColumn>
        <ElTableColumn prop="childrens_count" :label="$t('User.Children')">
          <template #default="{ row }">
            <span v-if="!!row.childrens_count"> {{ row.childrens_count }} </span>
            <ElButton v-else type="primary" plain>
              <UiIcon :icon="$options.icons.PLUS" />
            </ElButton>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="actions" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="patients-table-actions">
              <ElButton type="primary" @click.stop="makeAppointment(row)">
                {{ $t('Base.MakeAppointment') }}
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>

    <ElPagination
      class="patients-table-wrapper__pagination"
      :current-page="page"
      :page-count="pageCount"
      :page-size="perPage"
      :page-sizes="pageSizes"
      :total="total"
      background
      hide-on-single-page
      layout="prev, pager, next, sizes"
      @update:current-page="$emit('update:page', $event)"
      @update:page-size="$emit('update:perPage', $event)" />
  </div>
</template>

<script>
import { REGISTRY_PATIENT_ROUTE } from '@/router/registry.routes';
import * as icons from '@/enums/icons.enum.js';
import { PAGE_SIZES } from '@/config/ui.config';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';

export default {
  name: 'PatientsTable',
  emits: ['update:perPage', 'update:page'],
  props: {
    /**
     * @param { Array<Patient|object> } items
     */
    loading: Boolean,
    items: Array,
    page: Number,
    perPage: Number,
    total: Number,
    search: String,
  },
  icons: icons,
  computed: {
    hasItems() {
      return !!this.items.length;
    },
    pageCount() {
      return Math.ceil(this.total / this.perPage);
    },
    pageSizes() {
      return PAGE_SIZES;
    },
  },
  watch: {
    loading() {
      this.$refs.elTable.scrollTo({ top: 0, behavior: 'smooth' });
    },
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
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
