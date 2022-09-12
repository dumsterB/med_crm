<template>
  <LayoutByUserRole fixHeight>
    <EventCalendar
      class="v-dashboard-content__calendar"
      v-model:type="type.value"
      v-model:date="date.value"
      :loading="loading.calendar"
      :month-data="dataForMonth"
      :day-data="dataForDay"
      @click:event="goToAppointment">
      <template #actions>
        <UiModelsAutocompleteSearch
          v-if="!userIsDoctor"
          class="v-dashboard-content__doctor-select"
          :model-value="doctorId.value || null"
          :model-for-use="Doctor"
          :default-item="doctor"
          :placeholder="$t('Appointments.SelectDoctor')"
          clearable
          @update:model-value="doctorId.value = $event" />
      </template>
    </EventCalendar>
  </LayoutByUserRole>
</template>

<script>
import { mapState } from 'vuex';
import LayoutByUserRole from '@/components/layouts/LayoutByUserRole/index.vue';
import EventCalendar from '@/components/EventCalendar/index.vue';
import { EVENT_CALENDAR_TYPES } from '@/components/EventCalendar/index.enum';
import { useQuery } from '@/hooks/useQuery.hook';
import {
  ISOStringToDateAppFormat,
  getDaysInMonth,
  resetDaysInISOString,
  dateAppFormatToISOString,
} from '@/utils/dateAndTime.utils';
import { Doctor } from '@/models/Doctor.model';
import { Appointment } from '@/models/Appointment.model';
import { User } from '@/models/User.model';
import { EventCalendarEvent } from '@/components/EventCalendar/Event/EventCalendarEvent.model';
import { I18nService } from '@/services/i18n.service';
import { groupBy } from 'lodash';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';

export default {
  name: 'VDashboard',
  components: { EventCalendar, LayoutByUserRole },
  setup: () => ({
    type: useQuery({
      field: 'calendar_type',
      defaultValue: EVENT_CALENDAR_TYPES.MONTH,
      routerPush: true,
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
  data() {
    return {
      loading: {
        calendar: false,
        doctor: false,
      },
      dataForMonth: {},
      dataForDay: [],

      /** @type Doctor */
      doctor: null, // загрузить доктора при открытии страницы по ид из query
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    userIsDoctor() {
      return this.user.role === User.enum.roles.Doctor;
    },

    daysInMonth() {
      return getDaysInMonth(this.startAt);
    },
    startAt() {
      const forMonthType = resetDaysInISOString(this.date.value);

      return this.type.value === EVENT_CALENDAR_TYPES.MONTH ? forMonthType : this.date.value;
    },
    endAt() {
      const forMonthType = this.startAt.replace(
        /(\d\d\d\d)-(\d\d)-(\d\d)T/,
        (str, year, month) => `${year}-${month}-${this.daysInMonth}T`
      );

      return this.type.value === EVENT_CALENDAR_TYPES.MONTH ? forMonthType : this.date.value;
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
    // использую I18nService - почему-то при переходе на другую страницу watcher всё равно отрабатывает до демонтирования компонента
    async getDataForMonthType() {
      const { data } = await Appointment.getStatistic({
        startAt: ISOStringToDateAppFormat(this.startAt, { withTime: false, fullYear: false }),
        endAt: ISOStringToDateAppFormat(this.endAt, { withTime: false, fullYear: false }),
        doctorsId: this.userIsDoctor ? this.user.doctor_id : this.doctorId.value || null,
      });

      this.dataForMonth = {};
      Object.keys(data.data).forEach((date) => {
        this.dataForMonth[dateAppFormatToISOString(date).split('T')[0]] = [
          { title: I18nService.tc('Appointments.AppointmentsTc', data.data[date].count) },
        ];
      });
    },

    async getDateForDayType() {
      /** @type { {data: Array<Appointment>} } */
      const { data } = await Appointment.find({
        page: 1,
        per_page: 999,
        query_field: 'doctor_id',
        query_type: 'IN',
        search: this.userIsDoctor ? this.user.doctor_id : this.doctorId.value || null,
        start_at: ISOStringToDateAppFormat(this.startAt, { withTime: false, fullYear: false }),
        end_at: ISOStringToDateAppFormat(this.endAt, { withTime: false, fullYear: false }),
        not_canceled: true,
      });
      const excludedLiveQueue = data.data.filter((appointment) => appointment.start_at);

      const groups = groupBy(excludedLiveQueue, 'doctor_id');
      this.dataForDay = Object.keys(groups).map((doctorId) => ({
        column: {
          id: doctorId,
          title: groups[doctorId][0].doctor.name,
        },
        data: groups[doctorId].map(
          (appointment) =>
            new EventCalendarEvent({
              title: this.$t('Base.Appointment'),
              description: appointment.patient?.name,
              startAt: appointment.start_at,
              endAt: appointment.end_at,
              payload: appointment,
            })
        ),
      }));
    },

    async getDefaultDoctor() {
      this.loading.doctor = true;

      const { data } = await Doctor.findOneById(this.doctorId.value);
      this.doctor = data.data;

      this.loading.doctor = false;
    },

    goToAppointment(event) {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          id: event.payload.id,
        },
      });
    },
  },

  mounted() {
    if (this.doctorId.value) this.getDefaultDoctor();
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
