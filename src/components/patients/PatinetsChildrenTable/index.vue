<template>
  <div class="patient-children-table-wrapper">
    <ElScrollbar class="patient-children-table-wrapper__scrollbar">
      <ElTable
          class="patient-children-table"
          ref="elTable"
          :data="data.children"
          v-loading="loading">

        <template #empty>
          <div class="patient-children-table__empty patient-children-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
          </div>
        </template>
        <ElTableColumn prop="name" :label="$t('Base.FullName')"> </ElTableColumn>
        <ElTableColumn prop="gender" :label="$t('User.Gender')"> </ElTableColumn>
        <ElTableColumn prop="birthdate" :label="$t('User.Birthdate')"> </ElTableColumn>
        <ElTableColumn prop="birthdate" :label="$t('User.Parent')">
          <template #default="{ row }">
            {{data.parent}}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" width="300" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="patient-children-table-actions">
              <ElButton type="primary" @click.stop="createAppointment(row)">
                <template #icon>
                  <UiIcon :icon="$options.icons.PLUS" />
                </template>
                {{ $t('Appointments.CreateAppointment') }}
              </ElButton>

              <ElButton type="primary" plain @click.stop="openChildren(row)">
                {{ $t('Base.OpenCard') }}
              </ElButton>
            </div>
          </template>
        </ElTableColumn>

      </ElTable>
    </ElScrollbar>
  </div>
</template>

<script>
import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import AppointmentStartOrEndDate from '@/components/appointments/AppointmentStartOrEndDate/index.vue';
import * as icons from '@/enums/icons.enum.js';
import CreateOrEditAppointmentDrawer from "@/components/appointments/CreateOrEditAppointmentDrawer/index.vue";
import {REGISTRY_PATIENT_ROUTE} from "@/router/registry.routes";

export default {
  name: 'QueueTable',
  components: { AppointmentStartOrEndDate, AppointmentStatusTag },
  props: {
    /**
     * @param { Object<Children|object> } data
     */
    data: Object,
    loading: Boolean,
  },
  icons: icons,
  computed: {},
  watch: {
    loading() {
      this.$refs.elTable.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  methods: {
    createAppointment(row) {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          patient: row,
        },
      });
    },
    openChildren(row){
      this.$router.push({
        name: REGISTRY_PATIENT_ROUTE.name,
        params: { id: row.id },
      });
    }
  },
  setup: () => ({
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
