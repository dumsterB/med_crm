<template>
  <div class="patients-records-table-wrapper">
    <ElScrollbar class="patients-records-table-wrapper__scrollbar">
      <ElTable
        class="patients-records-table"
        :data="items"
        v-loading="loading"
        ref="elTable"
        @row-click="VAppointment">
        <template #empty>
          <div class="patients-records-table__empty patients-records-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
            <ElButton type="primary" @click="addAppointment">
              {{ $t('Patients.AddPatient') }}
            </ElButton>
          </div>
        </template>

        <ElTableColumn width="60" prop="id" label="ID">
          <template #default="{ row }">
            {{ row.id }}
          </template>
        </ElTableColumn>

        <ElTableColumn width="130" prop="start_at" :label="$t('DateAndTime.StartAt')">
          <template #default="{ row }">
            {{ row.start_at }}
          </template>
        </ElTableColumn>

        <ElTableColumn width="130" prop="end_at" :label="$t('DateAndTime.EndAt')">
          <template #default="{ row }">
            {{ row.end_at }}
          </template>
        </ElTableColumn>

        <ElTableColumn width="240" prop="doctor_name" :label="$t('Appointments.Types.Doctor')">
          <template #default="{ row }">
            {{ row.doctor.name }}
          </template>
        </ElTableColumn>

        <ElTableColumn width="220" prop="patient" :label="$t('Base.Patient')">
          <template #default="{ row }">
            {{ row.patient.name }}
          </template>
        </ElTableColumn>

        <ElTableColumn width="180" prop="phone_patient" :label="$t('Appointments.PhonePatient')">
          <template #default="{ row }">
            {{ row.patient.phone }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="status" :label="$t('Appointments.Statuses.Status')">
          <template #default="{ row }">
            <div class="patients-records-table-status">
              <span v-if="row.status === Appointment.enum.statuses.Approved">
                <el-button size="small" class="success-status" type="success" round>
                  <UiIcon :icon="$options.icons.DOUBLE_CHECKER" />
                  <span class="patients-records-table-status">{{
                    $t(`Appointments.Statuses.${row.status}`)
                  }}</span>
                </el-button>
              </span>
              <span v-if="row.status === Appointment.enum.statuses.Canceled">
                <el-button size="small" class="canceled-status" type="danger" round>
                  <UiIcon :icon="$options.icons.CANCELED" />
                  <span class="patients-records-table-status">{{
                    $t(`Appointments.Statuses.${row.status}`)
                  }}</span>
                </el-button>
              </span>
              <span v-if="row.status === Appointment.enum.statuses.Provided">
                <el-button size="small" class="provided-status" type="warning" round>
                  <UiIcon :icon="$options.icons.PROVIDED" />
                  <span class="patients-records-table-status">{{
                    $t(`Appointments.Statuses.${row.status}`)
                  }}</span>
                </el-button>
              </span>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn width="160" prop="phone_patient" :label="$t('Appointments.RecordingSource')">
          <template #default="{ row }">
            {{ row.patient.phone }}
          </template>
        </ElTableColumn>

        <ElTableColumn width="180" prop="phone_patient" :label="$t('DateAndTime.CreatedAt')">
          <template #default="{ row }">
            {{ row.clinic.published_at }}
          </template>
        </ElTableColumn>

        <ElTableColumn width="120" prop="phone_patient" :label="$t('DateAndTime.Look')">
          <template #default="{ row }">
            {{ $t('Appointments.Open') }}
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>
    <ElPagination
      class="patients-records-table-wrapper__pagination"
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
import { REGISTRY_PATIENT_RECORD_ROUTE } from '@/router/registry.routes';
import * as icons from '@/enums/icons.enum.js';
import { PAGE_SIZES } from '@/config/ui.config';
import { Check } from '@element-plus/icons-vue';
import {Appointment} from "@/models/Appointment.model";
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';

export default {
  name: 'PatientsTable',
  emits: ['update:perPage', 'update:page'],
  components: {
    Check,
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
    VAppointment(payload) {
      this.$router.push({
        name: REGISTRY_PATIENT_RECORD_ROUTE.name,
        params: {patientId: payload.patient_id , id: payload.id },
      });
    },
    addAppointment() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          nameOrPhone: this.search,
        },
      });
    },
  },
  setup: () => ({
    Appointment,
  })
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
