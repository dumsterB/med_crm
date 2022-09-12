<!--   TODO: реализовать нормальный показ загрузки(get) -->
<template>
  <ElDialog
    :title="$t('Title')"
    width="500px"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <div class="select-treatment-modal-content" v-loading="loading.get">
      <ElButton
        v-for="treatment in items"
        :key="treatment.id"
        type="primary"
        :loading="loading.select && selectedTreatmentId === treatment.id"
        @click="selectTreatment(treatment)">
        {{ treatment.title }}
      </ElButton>
    </div>
  </ElDialog>
</template>

<script>
import { Treatment } from '@/models/Treatment.model';
import { Appointment } from '@/models/Appointment.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';

export default {
  name: 'SelectTreatmentModal',
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    appointment: [Appointment, Object],
  },
  data() {
    return {
      loading: {
        get: false,
        select: false,
      },
      /** @type {Array<Treatment>} */
      items: [],

      selectedTreatmentId: null,
    };
  },

  watch: {
    'appointment.patient_id': {
      handler(value) {
        if (value) this.getTreatments(value);
      },
      immediate: true,
    },
  },

  methods: {
    async getTreatments(userId) {
      this.loading.get = true;

      const { data } = await Treatment.findByUserId(userId);
      this.items = data.data;

      this.loading.get = false;
    },

    async selectTreatment(treatment) {
      if (this.loading.select) return;
      this.loading.select = true;
      this.selectedTreatmentId = treatment.id;

      try {
        const { data } = await Appointment.attachTreatment({
          treatmentId: treatment.id,
          appointmentId: this.appointment.id,
        });

        this.$emit(
          'action',
          new GlobalModalAction({
            name: 'selected',
            data: {
              appointment: data.data,
              treatment: treatment,
            },
          })
        );
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'danger',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.select = false;
      this.selectedTreatmentId = null;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
