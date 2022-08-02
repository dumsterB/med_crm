<template>
  <ElDrawer
    :model-value="modelValue"
    :title="$t('Patients.AddPatient')"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm class="create-patient-drawer-form" label-position="top" @submit.prevent="createPatient">
      <ElFormItem :label="$t('User.FullName')">
        <ElInput v-model="patient.name" required />
      </ElFormItem>

      <ElFormItem>
        <ElSwitch :active-text="$t('User.IsChildren')" v-model="isChildren" />
      </ElFormItem>

      <ElFormItem v-if="!isChildren" :label="$t('User.Phone')">
        <UiPhoneInput v-model="patient.phone" required />
      </ElFormItem>

      <ElFormItem v-if="isChildren" :label="$t('User.Parent')">
        <UiPatientsAutocompleteSearch v-model="patient.parent_id" required />
      </ElFormItem>

      <ElFormItem :label="$t('User.Gender')">
        <UiGenderSelect v-model="patient.gender" required />
      </ElFormItem>

      <ElFormItem :label="$t('User.Birthdate')">
        <ElDatePicker
          v-model="patient.birthdate"
          type="date"
          :placeholder="$t('Base.SelectDate')"
          required />

        <UiRequiredHiddenInput :modelValue="patient.birthdate" />
      </ElFormItem>

      <ElButton
        class="create-patient-drawer-form__submit"
        type="primary"
        native-type="submit"
        :loading="loading">
        {{ $t('Patients.AddPatient') }}
      </ElButton>
    </ElForm>
  </ElDrawer>
</template>

<script>
import { getParentFolderNameByPath } from '@/utils/vite.util';
import { Patient } from '@/models/Patient.model';
import { GlobalDrawerAction } from '@/models/client/ModalAndDrawer/GlobalDrawerAction';

export default {
  name: getParentFolderNameByPath(import.meta.url),
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    nameOrPhone: String,
    patientProp: [Patient, Object],
  },
  data() {
    return {
      /**
       * @type Patient
       */
      patient: null,
      loading: false,
      isChildren: false,
    };
  },

  watch: {
    modelValue: {
      handler() {
        this.patient = new Patient(this.patientProp || {});
      },
      immediate: true,
    },
    nameOrPhone: {
      handler() {
        this.nameOrPhoneWatcherHandler();
      },
      immediate: true,
    },
  },

  methods: {
    async createPatient() {
      if (this.loading) return;
      this.loading = true;

      try {
        const { patient } = await Patient.create(this.patient);
        this.$store.dispatch('patients/createItem', patient);

        this.$notify({ type: 'success', title: this.$t('Notifications.SuccessCreated') });
        this.$emit('action', new GlobalDrawerAction({ name: 'created', data: { patient } }));
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading = false;
    },

    nameOrPhoneWatcherHandler() {
      const isName = /[a-zA-Zа-яА-Я]/gim.test(this.nameOrPhone);
      isName ? (this.patient.name = this.nameOrPhone) : (this.patient.phone = this.nameOrPhone);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="./index.locales.json" />
