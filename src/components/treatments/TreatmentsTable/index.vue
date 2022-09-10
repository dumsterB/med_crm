<template>
  <div class="treatments-table-wrapper">
    <ElScrollbar class="treatments-table-wrapper__scrollbar">
      <ElTable
        class="treatments-table"
        :data="items"
        v-loading="loading"
        ref="elTable"
        @row-click="goToTreatment">
        <template #empty>
          <div class="treatments-table__empty treatments-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
          </div>
        </template>

        <ElTableColumn prop="doctor.name" :label="$t('Base.DoctorFullName')" />
        <ElTableColumn prop="title" :label="$t('Base.Naming')" />
        <ElTableColumn prop="price" :label="$t('Base.Price')">
          <template #default="{ row }"> {{ row.price }} {{ $t('Base.Sum') }} </template>
        </ElTableColumn>
        <ElTableColumn prop="created_at" :label="$t('Base.DateAppoint')" />
        <ElTableColumn prop="duration" :label="$t('Base.ColDays')" />
        <ElTableColumn :label="$t('Base.Status')">
          <template #default="{ row }">
            <TreatmentStatusTag :status="row.status" />
          </template>
        </ElTableColumn>

        <ElTableColumn v-if="isDoctor" prop="actions" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="treatments-table-actions">
              <ElButton
                v-show="row.status !== Treatment.enum.statuses.Closed"
                type="primary"
                :loading="localLoading.closeTreatment && closedTreatmentId == row.id"
                @click="closeTreatment(row)">
                {{ $t('Treatments.CloseTreatment') }}
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
import { PAGE_SIZES } from '@/config/ui.config';
import { DOCTORS_TREATMENT_ROUTE } from '@/router/treatments.routes';
import { Treatment } from '@/models/Treatment.model';
import { User } from '@/models/User.model';

import TreatmentStatusTag from '@/components/treatments/TreatmentStatusTag/index.vue';

export default {
  name: 'TreatmentsTable',
  components: { TreatmentStatusTag },
  emits: ['item:update'],
  props: {
    /** @param { Array<Treatment|object> } items */
    items: Array,
    loading: Boolean,
    page: Number,
    perPage: Number,
    total: Number,
    search: String,
  },
  data() {
    return {
      localLoading: {
        closeTreatment: false,
      },
      closedTreatmentId: null,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    isDoctor() {
      return this.user.role === User.enum.roles.Doctor;
    },

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
    goToTreatment(row) {
      this.$router.push({
        name: DOCTORS_TREATMENT_ROUTE.name,
        params: {
          id: row.id,
        },
      });
    },

    async closeTreatment(treatment) {
      if (this.localLoading.closeTreatment) return;
      this.localLoading.closeTreatment = true;
      this.closedTreatmentId = treatment.id;

      try {
        const { data } = await Treatment.close(treatment.id);
        this.$emit('item:update', data.data);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.localLoading.closeTreatment = false;
      this.closedTreatmentId = null;
    },
  },

  setup: () => ({
    Treatment,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/treatments.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
