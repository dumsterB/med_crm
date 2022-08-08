<template>
  <div class="schedule-slots-select">
    <ElDatePicker
      class="schedule-slots-select__date"
      v-model="date"
      placeholder="select date"
      :disabled="disabled"
      :value-format="DATE_FORMAT">
    </ElDatePicker>

    <ElSelect
      class="schedule-slots-select__time"
      v-model="slot"
      value-key="start_at"
      :disabled="disabled"
      :loading="loading">
      <ElOption
        v-for="slot in slotsForSelect"
        :key="slot.label"
        :label="slot.label"
        :value="slot.value" />
    </ElSelect>
  </div>
</template>

<script>
import { DATE_FORMAT } from '@/config/dateAndTime.config';
import { ScheduleSlot } from '@/models/ScheduleSlot.model';
import { excludeDate } from '@/utils/dateAndTime.utils';

export default {
  name: 'ScheduleSlotsSelect',
  emits: ['update:startAt', 'update:endAt'],
  props: {
    startAt: [Date, String],
    endAt: [Date, String],
    serviceId: [Number, String],
    groupServiceId: [Number, String],
    disabled: Boolean,
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
      handler(value) {
        this.slot = null;
        if (value) this.getSlots();
      },
      immediate: true,
    },

    slot(value) {
      if (!value) return;
      this.$emit('update:startAt', value.start_at);
      this.$emit('update:endAt', value.end_at);
    },
    startAt(value) {
      if (this.slot.start_at !== value) this.slot.start_at = value;
    },
    endAt(value) {
      if (this.slot.end_at !== value) this.slot.end_at = value;
    },
  },

  methods: {
    async getSlots() {
      this.loading = true;
      this.serviceId ? await this.getSlotsByService() : await this.getSlotsByGroupService();
      this.loading = false;
    },

    async getSlotsByService() {
      const { data } = await ScheduleSlot.getSlotsByServiceId({
        serviceId: this.serviceId,
        from: `${this.date} 00:00`,
        to: `${this.date} 23:59`,
      });
      this.slots = data.data;
    },
    async getSlotsByGroupService() {
      const { data } = await ScheduleSlot.getSlotsByGroupServiceId({
        groupServiceId: this.groupServiceId,
        from: this.from,
        to: this.to,
      });
    },
  },

  setup: () => ({
    DATE_FORMAT,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
