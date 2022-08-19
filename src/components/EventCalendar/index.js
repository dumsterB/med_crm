import MonthCalendar from '@/components/EventCalendar/MonthCalendar/index.vue';
import DayCalendar from '@/components/EventCalendar/DayCalendar/index.vue';
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
      default: 'month',
      validator: (val) => [EVENT_CALENDAR_TYPES.MONTH, EVENT_CALENDAR_TYPES.DAY].includes(val),
    },

    date: String, // ISO format
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
  },

  setup: () => ({
    types: Object.keys(EVENT_CALENDAR_TYPES).map((key) => EVENT_CALENDAR_TYPES[key]),
    EVENT_CALENDAR_TYPES,
  }),
};
