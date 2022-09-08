<template>
  <div class="treatments-table-wrapper">
    <ElScrollbar class="treatments-table-wrapper__scrollbar">
      <ElTable
          class="treatments-table"
          :data="items"
          v-loading="loading"
          ref="elTable"
          @row-click="goToTreatment"
      >
        <template #empty>
          <div class="treatments-table__empty treatments-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
            <ElButton v-if="!isDoctor" type="primary" >
              {{ $t('Patients.AddPatient') }}
            </ElButton>
          </div>
        </template>

        <ElTableColumn prop="user.doctor.name" :label="$t('Base.DoctorFullName')"></ElTableColumn>
        <ElTableColumn prop="title" :label="$t('Base.Naming')"></ElTableColumn>
        <ElTableColumn prop="price" :label="$t('Base.Price')">
          <template #default="{ row }">
             {{row.price}}  {{$t('Base.Sum')}}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="created_at" :label="$t('Base.DateAppoint')"></ElTableColumn>
        <ElTableColumn prop="duration" :label="$t('Base.ColDays')"></ElTableColumn>
        <ElTableColumn :label="$t('Base.Status')">
          <template #default="{ row }">
            <AppointmentStatusTag :status="row.status" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="actions" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="treatments-table-actions">
              <ElButton @click="goToTreatment">
                {{ $t('Base.Open') }}
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>

    <ElPagination
        class="treatments-table-wrapper__pagination"
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
import { mapState } from 'vuex';
import * as icons from '@/enums/icons.enum.js';
import { PAGE_SIZES } from '@/config/ui.config';
import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
export default {
  name: 'TreatmentTable',
  components:{
    AppointmentStatusTag
  },
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
    ...mapState({
      user: (state) => state.auth.user,
    }),
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
    goToTreatment(row){

    }
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
