<template>
  <div class="schedule-slots-select">
    <ElDatePicker
      class="schedule-slots-select__date"
      v-model="date"
      :disabled="disabled"
      :value-format="DATE_FORMAT">
    </ElDatePicker>
    <ElSelect class="schedule-slots-select__time" v-model="slot" :disabled="disabled"> </ElSelect>
  </div>
</template>

<script>
import { DATE_FORMAT } from '@/config/dateAndTime.config';
import { ScheduleSlot } from '@/models/ScheduleSlot.model';

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
      date: null,
      slot: null,
      loading: false,
    };
  },
  computed: {
    from() {
      return `${this.date} 00:00`;
    },
    to() {
      return `${this.date} 23:59`;
    },
  },
  watch: {
    date: {
      handler(value) {
        if (value) this.getSlots();
      },
      immediate: true,
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
        from: this.from,
        to: this.to,
      });
      console.log(data);
    },
    async getSlotsByGroupService() {
      const { data } = await ScheduleSlot.getSlotsByGroupServiceId({
        groupServiceId: this.groupServiceId,
        from: this.from,
        to: this.to,
      });
      console.log(data);
    },
  },

  setup: () => ({
    DATE_FORMAT,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
