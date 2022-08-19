<template>
  <LayoutRegistry>
    <EventCalendar
      v-model:type="type.value"
      v-model:date="date.value"
      :loading="loading.calendar"
      :month-data="dataForMonth">
      <template #actions>
        <UiModelsAutocompleteSearch
          v-model="doctorId.value"
          :model-for-use="Doctor"
          :default-item="doctor"
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
import { Appointment } from '@/models/Appointment.model';
import {
  ISOStringToDateAppFormat,
  getDaysInMonth,
  resetDaysInISOString,
  dateAppFormatToISOString,
} from '@/utils/dateAndTime.utils';

export default {
  name: 'VDashboard',
  components: { EventCalendar, LayoutRegistry },
  data() {
    return {
      loading: {
        calendar: false,
        doctor: false,
      },
      dataForMonth: {},

      /** @type Doctor */
      doctor: null, // загрузить доктора при открытии страницы по ид из query
    };
  },
  computed: {
    startAt() {
      return resetDaysInISOString(this.date.value);
    },
    endAt() {
      return this.startAt.replace(
        /(\d\d\d\d)-(\d\d)-(\d\d)T/,
        (str, year, month) => `${year}-${month}-${this.daysInMonth}T`
      );
    },
    daysInMonth() {
      return getDaysInMonth(this.startAt);
    },

    watchers() {
      return {
        type: this.type.value,
        date: this.date.value,
        doctorId: this.doctorId.value,
      };
    },
  },

  watch: {
    watchers: {
      async handler() {
        this.loading.calendar = true;

        this.type.value === EVENT_CALENDAR_TYPES.MONTH
          ? await this.getDataForMonthType()
          : await this.getDateForDayType();

        this.loading.calendar = false;
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async getDataForMonthType() {
      const { data } = await Appointment.getStatistic({
        startAt: ISOStringToDateAppFormat(this.startAt, { withTime: false, fullYear: false }),
        endAt: ISOStringToDateAppFormat(this.endAt, { withTime: false, fullYear: false }),
        doctorsId: this.doctorId.value ? [this.doctorId.value] : [],
      });

      this.dataForMonth = {};
      Object.keys(data.data).forEach((date) => {
        this.dataForMonth[dateAppFormatToISOString(date).split('T')[0]] = [
          { title: `${data.data[date].count} records` },
        ];
      });
    },

    async getDateForDayType() {},

    async getDefaultDoctor() {
      this.loading.doctor = true;

      const { data } = await Doctor.findOneById(this.doctorId.value);
      this.doctor = data.data;

      this.loading.doctor = false;
    },
  },

  mounted() {
    if (this.doctorId.value) this.getDefaultDoctor();
  },

  setup: () => ({
    type: useQuery({
      field: 'calendar_type',
      defaultValue: EVENT_CALENDAR_TYPES.MONTH,
    }),
    date: useQuery({
      field: 'calendar_date',
      defaultValue: new Date().toISOString(),
      formatter: (val) => new Date(val).toISOString(),
    }),
    doctorId: useQuery({
      field: 'doctor_id',
      defaultValue: null,
      valueIsNumber: true,
    }),
    Doctor: Doctor,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
