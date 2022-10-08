<template>
  <div class="schedule-slots-select">
    <div class="schedule-slots-select__date">
      <ElDatePicker
        v-model="date"
        :placeholder="$t('DateAndTime.SelectDate')"
        :disabled="disabled"
        :value-format="DATE_FORMAT">
      </ElDatePicker>
      <UiRequiredHiddenInput :model-value="date" :required="required" />
    </div>

    <div class="schedule-slots-select__time">
      <ElSelect
        v-model="slot"
        value-key="start_at"
        :disabled="disabled || !date"
        :loading="loading"
        :placeholder="$t('DateAndTime.Time')">
        <ElOption
          v-for="slot in slotsForSelect"
          :key="slot.label"
          :label="slot.label"
          :value="slot.value" />
      </ElSelect>

      <UiRequiredHiddenInput :model-value="slot.start_at" :required="required" />
    </div>
  </div>
</template>

<script>
import { DATE_FORMAT } from '@/config/dateAndTime.config';
import { ScheduleSlot } from '@/models/ScheduleSlot.model';
import { excludeDate, getCurrentDate } from '@/utils/dateAndTime.utils';

export default {
  name: 'ScheduleSlotsSelect',
  emits: ['update:startAt', 'update:endAt'],
  props: {
    startAt: [Date, String],
    endAt: [Date, String],
    defaultStartAt: [Date, String],
    defaultEndAt: [Date, String],
    searchQuery: Object,
    disabled: Boolean,
    required: Boolean,
    dependencies: [Array, Object], // при изменении сбрасываем startAt, endAt
  },
  data() {
    return {
      loading: false,
      date: null,
      slot: {
        start_at: null,
        end_at: null,
      },
      /** @type {Array<ScheduleSlot>} */
      slots: [],
    };
  },
  computed: {
    availableSlots() {
      return this.slots.filter((elem) => elem.available);
    },

    /** @type {Array<{label: string, value: {startAt: string, endAt: string}}>} */
    slotsForSelect() {
      return this.availableSlots.map((elem) => {
        return {
          label: `${excludeDate(elem.start_at)} - ${excludeDate(elem.end_at)}`,
          value: {
            start_at: elem.start_at,
            end_at: elem.end_at,
          },
        };
      });
    },
  },
  watch: {
    date: {
      handler(value, oldValue) {
        if (oldValue !== undefined) {
          // this.slots = [];
          this.slot.start_at = null;
          this.slot.end_at = null;
        }
        if (value) this.getSlots();
      },
      immediate: true,
    },

    slot: {
      handler(value) {
        this.$emit('update:startAt', value.start_at);
        this.$emit('update:endAt', value.end_at);
      },
      deep: true,
    },
    startAt: {
      handler(value) {
        if (this.slot.start_at !== value) {
          if (value) this.date = value?.split(' ')[0];
          this.slot.start_at = value;
        }
      },
      immediate: true,
    },
    endAt: {
      handler(value) {
        if (this.slot.end_at !== value) {
          if (value) this.date = value?.split(' ')[0];
          this.slot.end_at = value;
        }
      },
      immediate: true,
    },

    dependencies: {
      handler() {
        this.slot.start_at = null;
        this.slot.end_at = null;
        this.date = null;
        this.slots = [];
      },
      deep: true,
    },
  },

  methods: {
    async getSlots() {
      this.loading = true;

      const { data } = await ScheduleSlot.get({
        ...this.searchQuery,
        from: `${this.date} 00:00`,
        to: `${this.date} 23:59`,
      });
      this.slots = data.data;

      this.loading = false;
    },
  },

  mounted() {
    if (this.defaultStartAt && this.defaultEndAt) {
      this.slot.start_at = this.defaultStartAt;
      this.slot.end_at = this.defaultEndAt;
      this.slots.push({
        start_at: this.defaultStartAt,
        end_at: this.defaultEndAt,
        available: true,
      });
    }
  },

  setup: () => ({
    DATE_FORMAT,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/dateAndTime.locales.json" />
