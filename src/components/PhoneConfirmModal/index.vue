<template>
  <ElDialog
    :title="'title'"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm label-position="top" @submit.prevent="checkCode">
      <ElFormItem :label="phone">
        <ElInput v-model="code" required />
      </ElFormItem>

      <ElButton type="primary" native-type="submit" :loading="loading.check">Submit</ElButton>
    </ElForm>
  </ElDialog>
</template>

<script>
import { Patient } from '@/models/Patient.model';

export default {
  name: 'PhoneConfirmModal',
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    phone: String,
  },
  data() {
    return {
      code: null,
      loading: {
        send: false,
        check: false,
      },
    };
  },
  watch: {
    phone: {
      handler(value) {
        if (value) this.sendCode();
      },
      immediate: true,
    },
  },

  methods: {
    async sendCode() {
      if (this.loading.send) return;
      this.loading.send = true;

      try {
        const { response } = await Patient.sendCodeOnPhone({ phone: this.phone });
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.send = false;
    },

    checkCode() {
      if (this.loading.check) return;
      this.loading.check = true;

      try {
        console.log('check');
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.check = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
