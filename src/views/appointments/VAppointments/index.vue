<template>
  <LayoutByUserRole content-class="v-patients-records-content" fixHeight>
    <div class="v-patients-records-content__header v-patients-records-content-header">
      <div class="v-patients-records-content-header__filters">
        <!--        <ElSelect
          v-model="value"
          :placeholder="$t('Appointments.SelectDoctor')"
          size="large">
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </ElSelect>

        <ElSelect
          v-model="value"
          :placeholder="$t('Appointments.SelectStatus')"
          size="large">
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </ElSelect>-->
      </div>

      <div class="v-patients-records-content-header__actions">
        <ElButton type="primary" @click="createAppointment">
          {{ $t('Appointments.CreateAppointment') }}
        </ElButton>
      </div>
    </div>

    <AppointmentsTable
      class="v-patients-records-content__table"
      :items="items"
      :loading="loading"
      v-model:page="page.value"
      v-model:per-page="perPage.value"
      :total="total"
      :search="search.value" />
  </LayoutByUserRole>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { usePage, usePerPage, useSearch } from '@/hooks/query';
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { ISOStringToDateAppFormat } from '@/utils/dateAndTime.utils';
import { Appointment } from '@/models/Appointment.model.js';

import AppointmentsTable from '@/components/appointments/AppointmentsTable/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import LayoutByUserRole from '@/components/layouts/LayoutByUserRole/index.vue';

export default {
  name: 'VAppointments',
  components: { LayoutByUserRole, AppointmentsTable },

  setup: () => ({
    perPage: usePerPage(),
    page: usePage(),
    search: useSearch(),
    timeOptions: {
      startAt: ISOStringToDateAppFormat(new Date().toISOString()),
      endAt: ISOStringToDateAppFormat(new Date().toISOString()),
    },
  }),
  computed: {
    ...mapState({
      loading: (state) => state.appointments.loading,
      items: (state) => state.appointments.data,
      total: (state) => state.appointments.total,
    }),

    queryWatchers() {
      return {
        perPage: this.perPage.value,
        page: this.page.value,
        search: this.search.value,
      };
    },
  },
  watch: {
    queryWatchers: {
      handler(value, oldValue) {
        compareQueriesThenLoadData({
          query: value,
          oldQuery: oldValue,
          resetPage: this.page.reset,
          getData: this.getAppointments,
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      setLoading: 'appointments/setLoading',
      setData: 'appointments/setData',
    }),

    async getAppointments() {
      this.setLoading(true);

      try {
        const { data } = await Appointment.find({
          per_page: this.perPage.value,
          page: this.page.value,
          start_at: this.timeOptions.startAt,
          end_at: this.timeOptions.endAt,
        });
        this.setData({
          items: data.data,
          total: +data.meta.total,
          overwriteDataState: true,
        });
      } catch (err) {
        console.log(err);
        this.$notify({ title: err?.response?.data?.message || this.$t('Notifications.Error') });
      }

      this.setLoading(false);
    },

    createAppointment() {
      this.$store.dispatch('modalAndDrawer/openDrawer', CreateOrEditAppointmentDrawer);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
