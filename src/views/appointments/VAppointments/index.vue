<template>
  <LayoutRegistry content-class="v-patients-records-content" fixHeight>
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
  </LayoutRegistry>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { usePage, usePerPage, useSearch } from '@/hooks/query';
import { Appointment } from '@/models/Appointment.model.js';
import { APPOINTMENTS_ROUTE } from '@/router/registry.routes';

import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import AppointmentsTable from '@/components/appointments/AppointmentsTable/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';

export default {
  name: 'VAppointments',
  components: { LayoutRegistry, AppointmentsTable },

  setup: () => ({
    perPage: usePerPage(),
    page: usePage(),
    search: useSearch(),
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
        this.queryWatchersHandler(value, oldValue);
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

    // TODO: вынести чтобы не дублировать
    queryWatchersHandler(value, oldValue) {
      if (
        value &&
        oldValue &&
        (value.perPage !== oldValue.perPage || value.search !== oldValue.search)
      ) {
        this.resetPage();
        return setTimeout(() => this.getAppointments());
      }

      this.getAppointments();
    },
    resetPage() {
      this.page.reset();
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
