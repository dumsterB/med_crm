<template>
  <LayoutByUserRole content-class="v-patients-records-content" fixHeight>
    <LayoutContentHeader>
      <template #actions>
        <ElButton type="primary" @click="createAppointment">
          {{ $t('Appointments.CreateAppointment') }}
        </ElButton>
      </template>
    </LayoutContentHeader>

    <AppointmentsTable
      :items="items"
      :loading="loading"
      v-model:page="page.value"
      v-model:per-page="perPage.value"
      :total="total"
      :search="search.value"
      @item:edit="editItem" />
  </LayoutByUserRole>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { usePage, usePerPage, useSearch } from '@/hooks/query';
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { getCurrentDate, ISOStringToDateAppFormat } from '@/utils/dateAndTime.utils';
import { Appointment } from '@/models/Appointment.model.js';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

import AppointmentsTable from '@/components/appointments/AppointmentsTable/index.vue';
import CreateOrEditAppointmentModal from '@/components/appointments/CreateOrEditAppointmentModal/index.vue';
import LayoutByUserRole from '@/components/layouts/LayoutByUserRole/index.vue';
import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';

export default {
  name: 'VAppointments',
  components: { LayoutContentHeader, LayoutByUserRole, AppointmentsTable },

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
      createItem: 'appointments/createItem',
      editItem: 'appointments/editItem',
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

    async createAppointment() {
      const action = await this.$store.dispatch(
        'modalAndDrawer/openModal',
        CreateOrEditAppointmentModal
      );

      if (action instanceof GlobalModalCloseAction) return;

      const currentDate = getCurrentDate();
      action.data.appointments.forEach((appointment) => {
        if (!appointment.start_at || appointment.start_at.split(' ')[0] === currentDate)
          this.createItem(appointment);
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
