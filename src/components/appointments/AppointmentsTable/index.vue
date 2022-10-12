<template>
  <div class="appointments-table-wrapper">
    <ElScrollbar class="appointments-table-wrapper__scrollbar">
      <ElTable
        v-loading="loading"
        class="appointments-table"
        :data="itemsWithPayload"
        ref="elTable"
        :row-class-name="getTableRowClassName"
        @row-click="goToAppointment">
        <template #empty>
          <div class="appointments-table__empty appointments-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
            <ElButton type="primary" @click="addAppointment">
              {{ $t('Appointments.CreateAppointment') }}
            </ElButton>
          </div>
        </template>

        <!--        <ElTableColumn class-name="appointments-table__id" width="60" prop="id" label="ID" />-->
        <ElTableColumn prop="doctor.name" :label="$t('Appointments.Types.doctor')" width="250px">
          <template #default="{ row }">
            <UiUserAvatarInfo
              class="appointments-table__doctor"
              :user="row.doctor"
              show-has-treatmnet />
          </template>
        </ElTableColumn>

        <ElTableColumn width="110px" prop="_start_at" :label="$t('DateAndTime.StartAt')" />
        <ElTableColumn width="100px" prop="_end_at" :label="$t('DateAndTime.EndAt')" />

        <ElTableColumn prop="patient.name" :label="$t('Base.Patient')" />
        <ElTableColumn prop="patient.phone" :label="$t('Appointments.PhonePatient')" />

        <ElTableColumn :label="$t('Base.Payment')" >
          <template #default="{ row }">
            <InvoiceStatusTag v-if="row.invoice" :status="row.invoice.status"></InvoiceStatusTag>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="status" :label="$t('Appointments.Statuses.Status')">
          <template #default="{ row }">
            <AppointmentStatusTag :status="row.status" />
          </template>
        </ElTableColumn>

        <!--        <ElTableColumn prop="created_at" :label="$t('DateAndTime.CreatedAt')" />-->

        <ElTableColumn v-if="isManager" prop="actions" :label="$t('Base.Actions')" width="380px">
          <template #default="{ row }">
            <div class="appointments-table__actions-row">
              <ElButton
                v-if="row.status === Appointment.enum.statuses.Approved"
                type="primary"
                @click.stop="updateAppointmentStatus(row.id, Appointment.enum.statuses.InProgress)">
                {{ $t('Appointments.CallToReception') }}
              </ElButton>

              <ElButton
                v-if="row.status === Appointment.enum.statuses.InProgress"
                type="primary"
                @click.stop="updateAppointmentStatus(row.id, Appointment.enum.statuses.Provided)">
                {{ $t('Appointments.EndReception') }}
              </ElButton>

              <ElButton
                v-if="
                  ![
                    Appointment.enum.statuses.Canceled,
                    Appointment.enum.statuses.Provided,
                  ].includes(row.status)
                "
                type="danger"
                plain
                @click.stop="updateAppointmentStatus(row.id, Appointment.enum.statuses.Canceled)">
                {{ $t('Appointments.CancelReception') }}
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>

    <ElPagination
      class="appointments-table-wrapper__pagination"
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
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import { PAGE_SIZES } from '@/config/ui.config';
import { Appointment } from '@/models/Appointment.model';
import { User } from '@/models/User.model';

import InvoiceStatusTag from '@/components/invoices/InvoiceStatusTag/index.vue';
import CreateOrEditAppointmentModal from '@/components/appointments/CreateOrEditAppointmentModal/index.vue';
import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';

export default {
  name: 'AppointmentsTable',
  components: { AppointmentStatusTag, InvoiceStatusTag },
  emits: ['update:perPage', 'update:page', 'item:edit'],
  props: {
    /** @type { Array<Appointment|object> } items */
    items: Array,
    loading: Boolean,
    page: Number,
    perPage: Number,
    total: Number,
    search: String,
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    isManager() {
      return this.user.role === User.enum.roles.Manager;
    },

    pageCount() {
      return Math.ceil(this.total / this.perPage);
    },
    pageSizes() {
      return PAGE_SIZES;
    },

    itemsWithPayload() {
      return this.items.map((elem) => ({
        ...elem,
        _start_at: elem.start_at?.split(' ')[1],
        _end_at: elem.end_at?.split(' ')[1],
      }));
    },
  },
  watch: {
    loading() {
      this.$refs.elTable.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },

  methods: {
    getTableRowClassName(row) {
      return `appointment_${row.row.status}`;
    },
    goToAppointment(payload) {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: { id: payload.id },
      });
    },
    addAppointment() {
      this.$store.dispatch('modalAndDrawer/openModal', CreateOrEditAppointmentModal);
    },

    async updateAppointmentStatus(id, status) {
      try {
        const { data } = await Appointment.updateStatus({
          id: id,
          status: status,
        });
        this.$emit('item:edit', data.data);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }
    },
  },
  setup: () => ({
    Appointment,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
