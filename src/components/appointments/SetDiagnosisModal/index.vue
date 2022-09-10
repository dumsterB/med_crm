<template>
  <ElDialog
    :title="$t('Title')"
    width="500px"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm class="set-diagnosis-modal-form" label-position="top" @submit.prevent="submitHandler">
      <ElFormItem>
        <MultipleSelectDiseaseCode v-model:codes="codes" required />
      </ElFormItem>

      <ElButton
        class="set-diagnosis-modal-form__submit"
        type="primary"
        native-type="submit"
        :loading="loading">
        {{ $t('Submit') }}
      </ElButton>
    </ElForm>
  </ElDialog>
</template>

<script>
import { Appointment } from '@/models/Appointment.model';
import { ServiceCase } from '@/models/ServiceCase.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import MultipleSelectDiseaseCode from '@/components/deseaseСode/MultipleSelectDiseaseCode/index.vue';

export default {
  name: 'SetDiagnosisModal',
  components: { MultipleSelectDiseaseCode },
  emits: ['update:modelValue', 'update:appointment', 'action'],
  props: {
    modelValue: Boolean,
    appointment: [Appointment, Object],
  },
  data() {
    return {
      codes: [],
      loading: false,
    };
  },

  methods: {
    async submitHandler() {
      this.loading = true;

      try {
        const { data } = await ServiceCase.update({
          id: this.appointment.service_case_id,
          payload: new ServiceCase({
            ...this.appointment.service_case,
            disease_code_codes: this.codes,
          }),
        });

        this.$emit(
          'action',
          new GlobalModalAction({
            name: 'created',
            data: {
              appointment: { ...this.appointment, service_case: data.data },
              service_case: data.data,
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
<i18n src="./index.locales.json" />
