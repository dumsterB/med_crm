<template>
  <LayoutRegistry>
    <EventCalendar v-model:type="type.value" v-model:date="date.value">
      <template #actions>
        <UiModelsAutocompleteSearch
          v-model="doctorId"
          :model-for-use="Doctor"
          :placeholder="$t('Appointments.SelectDoctor')" />
      </template>
    </EventCalendar>
  </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import EventCalendar from '@/components/EventCalendar/index.vue';
import { EVENT_CALENDAR_TYPES } from '@/components/EventCalendar/index.enum';
import { useQuery } from '@/hooks/useQuery.hook';
import { Doctor } from '@/models/Doctor.model';
import { resetTimeInISOString } from '@/utils/dateAndTime.utils';

export default {
  name: 'VDashboard',
  components: { EventCalendar, LayoutRegistry },
  data() {
    return {
      doctorId: null,
    };
  },

  setup: () => ({
    date: useQuery({
      field: 'calendar_date',
      defaultValue: resetTimeInISOString({ date: new Date().toISOString() }),
      formatter: (val) => resetTimeInISOString({ date: new Date(val).toISOString() }),
    }),
    type: useQuery({
      field: 'calendar_type',
      defaultValue: EVENT_CALENDAR_TYPES.MONTH,
    }),
    Doctor: Doctor,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
