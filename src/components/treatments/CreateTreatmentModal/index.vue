<template>
  <ElDialog
    custom-class="treatment-modal"
    :model-value="modelValue"
    width="500px"
    @update:modelValue="$emit('update:modelValue')">
    <p class="treatment-modal__title">{{ $t('Base.SetTreatment') }}</p>

    <ElForm class="treatment-modal-form" label-position="top" @submit.prevent="createTreatment">
      <ElInput
        class="treatment-modal__input"
        required
        v-model="title"
        :placeholder="$t('Base.Naming')" />
      <ElInput
        class="treatment-modal__input"
        required
        v-model="price"
        :placeholder="$t('Base.Price')" />
      <ElInput
        class="treatment-modal__input"
        v-model="duration"
        required
        :placeholder="$t('Base.QuantityDays')" />

      <ElButton
        class="treatment-modal-submit"
        :loading="loading"
        size="large"
        type="primary"
        native-type="submit">
        {{ $t('Base.Appoint') }}
      </ElButton>
    </ElForm>
  </ElDialog>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { Treatment } from '@/models/Treatment.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import { Appointment } from '@/models/Appointment.model';

export default {
  name: 'CreateTreatmentModal',
  icons: icons,
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    appointment: [Appointment, Object],
    userId: [Number, String],
  },
  data() {
    return {
      title: '',
      price: '',
      duration: '',
      loading: false,
    };
  },
  methods: {
    async createTreatment() {
      this.loading = true;

      try {
        const { data } = await Treatment.create({
          title: this.title,
          price: this.price,
          duration: this.duration,
          appointment_id: this.appointment?.id || null,
          user_id: this.appointment?.patient_id || this.userId,
          doctor_id: this.$store.state.auth.user.doctor_id,
        });

        this.$notify({ type: 'success', title: this.$t('Notifications.SuccessCreated') });
        this.$emit(
          'action',
          new GlobalModalAction({
            name: 'create',
            data: {
              treatment: data.data,
            },
          })
        );
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/base.locales.json" />
