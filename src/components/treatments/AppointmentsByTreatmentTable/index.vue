<template>
  <div class="reception-table-wrapper">
    <ElScrollbar class="reception-table-wrapper__scrollbar">
      <ElTable
        class="reception-table"
        :data="dataWithPayload"
        v-loading="loading"
        :empty-text="t('Base.NoData')"
        ref="elTable"
        @row-click="goToReception">
        <!--        <template #empty>
          <ElEmpty :description="$t('Base.NoData')" />
        </template>-->

        <ElTableColumn prop="start_at" :label="$t('Appointments.StartDate')"></ElTableColumn>

        <ElTableColumn
          v-for="label in inspectionCardAnswerColumnsLabel"
          :key="label"
          :label="label">
          <template #default="{ row }"> {{ row[label] }} </template>
        </ElTableColumn>

        <ElTableColumn :label="$t('Base.Status')">
          <template #default="{ row }">
            <AppointmentStatusTag :status="row.status" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="actions" width="200" :label="$t('Base.Actions')">
          <template #default>
            <div class="reception-table-actions">
              <ElButton type="primary" text>
                <template #icon> <UiIcon :icon="icons.EYE" /> </template>
                {{ $t('Base.Open') }}
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import { flattenDeep } from 'lodash';

export default {
  name: 'AppointmentsByTreatmentTable',
  components: { AppointmentStatusTag },
  props: {
    /** @type {Array<Appointment|object>} data */
    data: Array,
    loading: Boolean,
  },
  computed: {
    // TODO: вынести в отдельную утилиту
    dataWithPayload() {
      return this.data.map((elem) => {
        const returnElem = { ...elem };

        this.inspectionCardAnswerColumnsLabel.forEach((label) => {
          const block = elem.inspection_card.basic_data.find((elem) => elem.label === label);
          returnElem[label] = block?.answer?.value;
        });

        return returnElem;
      });
    },

    inspectionCardAnswerColumnsLabel() {
      const allAnswers = this.data.map((elem) => elem.inspection_card.basic_data);
      const columns = flattenDeep(allAnswers);
      const labels = columns.map((elem) => elem.label);

      return Array.from(new Set(labels));
    },
  },

  methods: {
    goToReception(row) {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          id: row.id,
        },
      });
    },
  },

  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
