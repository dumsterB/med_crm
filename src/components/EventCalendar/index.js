import MonthCalendar from '@/components/EventCalendar/MonthCalendar/index.vue';
import DayCalendar from '@/components/EventCalendar/DayCalendar/index.vue';
import * as icons from '@/enums/icons.enum.js';
import { EVENT_CALENDAR_TYPES } from '@/components/EventCalendar/index.enum';
import { prevOrNextMonthByISOString } from '@/utils/dateAndTime.utils';

export default {
  name: 'EventCalendar',
  emits: ['update:type', 'update:date'],
  components: { MonthCalendar, DayCalendar },
  props: {
    loading: Boolean,
    type: {
      type: String,
      default: EVENT_CALENDAR_TYPES.MONTH,
      validator: (val) => [EVENT_CALENDAR_TYPES.MONTH, EVENT_CALENDAR_TYPES.DAY].includes(val),
    },
    date: String, // ISO format

    /**
     * @property {object} monthData
     * @property {Array<object>} monthData[key] key = YYYY-MM-DD
     * @property {string} monthData[key][].title
     */
    monthData: Object,

    /**
     * @param {Array<object>} dayData
     * @param {{id: number, title: string}} dayData[].column
     * @param {Array<Appointment>} dayData[].data
     */
    dayData: Array,
  },
  computed: {
    month() {
      return new Date(this.date).getMonth();
    },
  },

  methods: {
    prevMonth() {
      this.$emit('update:date', prevOrNextMonthByISOString(this.date, { type: 'prev' }));
    },
    nextMonth() {
      this.$emit('update:date', prevOrNextMonthByISOString(this.date, { type: 'next' }));
    },
    setDayTypeAndDate(date) {
      this.$emit('update:type', EVENT_CALENDAR_TYPES.DAY);
      setTimeout(() => this.$emit('update:date', date));
    },
  },

  setup: () => ({
    types: Object.keys(EVENT_CALENDAR_TYPES).map((key) => EVENT_CALENDAR_TYPES[key]),
    EVENT_CALENDAR_TYPES,
    icons,
  }),
};
