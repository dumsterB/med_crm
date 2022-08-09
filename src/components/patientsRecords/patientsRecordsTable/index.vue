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

        <ElTableColumn prop="id" label="ID">
          <template #default="{ row }">
            {{ row.id }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="start_at" :label="$t('DateAndTime.StartAt')">
          <template #default="{ row }">
            {{ row.start_at }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="end_at" :label="$t('DateAndTime.EndAt')">
          <template #default="{ row }">
            {{ row.end_at }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="doctor_name" :label="$t('Appointments.Types.doctor')">
          <template #default="{ row }">
            {{ row.doctor.name }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="patient" :label="$t('Base.Patient')">
          <template #default="{ row }">
            {{ row.patient.name }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="phone_patient" :label="$t('Appointments.Types.phonePatient')">
          <template #default="{ row }">
            {{ row.patient.phone }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="status" :label="$t('Appointments.Types.Status')">
          <template #default="{ row }">
            <div class="patients-records-table-status">
              <span v-if="row.status === 'approved'">
                <el-button size="small" type="success" round>
                     <UiIcon :icon="$options.icons.DOUBLE_CHECKER" />
                 <span class="patients-records-table-status">{{ $t(`Appointments.Types.${row.status}`) }}</span>
                </el-button>
              </span>
              <span v-if="row.status === 'canceled'">
                <el-button size="small" type="danger" round>
                  <UiIcon :icon="$options.icons.CANCELED" />
                 <span class="patients-records-table-status">{{ $t(`Appointments.Types.${row.status}`) }}</span>
                </el-button>
              </span>
              <span v-if="row.status === 'provided'">
                <el-button size="small" type="warning" round>
                <UiIcon :icon="$options.icons.PROVIDED" />
                 <span class="patients-records-table-status">{{ $t(`Appointments.Types.${row.status}`) }}</span>
                </el-button>
              </span>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="phone_patient" :label="$t('Appointments.Types.phonePatient')">
          <template #default="{ row }">
            {{ row.patient.phone }}
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
import { Check } from '@element-plus/icons-vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';

export default {
  name: 'PatientsTable',
  emits: ['update:perPage', 'update:page'],
  components:{
    Check
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
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
