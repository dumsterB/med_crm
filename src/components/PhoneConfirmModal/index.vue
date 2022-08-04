<template>
  <ElDialog
    :title="'title'"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm label-position="top" @submit.prevent="checkCode">
      <ElFormItem :label="phone">
        <ElInput v-model="code" required />
      </ElFormItem>

      <ElButton type="primary" native-type="submit" :loading="loading">Submit</ElButton>
    </ElForm>
  </ElDialog>
</template>

<script>
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
      loading: false,
    };
  },

  methods: {
    checkCode() {
      if (this.loading) return;
      this.loading = true;
      try {
        console.log('check');
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
