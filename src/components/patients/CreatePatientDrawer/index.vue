<template>
  <ElDrawer
    :model-value="modelValue"
    :title="$t('Patients.AddPatient')"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm class="create-patient-drawer-form" label-position="top" @submit.prevent="submitHandler">
      <ElFormItem>
        <ElSwitch :active-text="$t('User.IsChildren')" v-model="isChildren" />
      </ElFormItem>

      <ElFormItem v-if="!isChildren" :label="$t('User.Phone')">
        <UiPhoneInput v-model="patient.phone" required />
      </ElFormItem>

      <ElFormItem v-if="isChildren" :label="$t('User.Parent')">
        <UiPatientsAutocompleteSearch v-model="patient.parent_id" required />
      </ElFormItem>

      <ElFormItem :label="$t('User.FullName')">
        <ElInput v-model="patient.name" required :disabled="isDisabledSecondaryInputs" />
      </ElFormItem>

      <ElFormItem :label="$t('User.Gender')">
        <UiGenderSelect v-model="patient.gender" required :disabled="isDisabledSecondaryInputs" />
      </ElFormItem>

      <ElFormItem :label="$t('User.Birthdate')">
        <ElDatePicker
          v-model="patient.birthdate"
          type="date"
          :placeholder="$t('Base.SelectDate')"
          required
          :disabled="isDisabledSecondaryInputs" />

        <UiRequiredHiddenInput :modelValue="patient.birthdate" />
      </ElFormItem>

      <ElFormItem v-if="hasPatient">
        <div class="create-patient-drawer-patient">
          <div class="create-patient-drawer-patient__title">Пациент уже существует</div>

          <ElButton v-if="!hasPatientFromOtherClinic" @click="goToPatient">
            go to patient
          </ElButton>
        </div>
      </ElFormItem>

      <ElFormItem>
        <div class="create-patient-drawer-form-actions">
          <ElButton type="danger" plain @click="$emit('update:modelValue', false)">
            {{ $t('Base.Cancel') }}
          </ElButton>
          <ElButton
            v-show="!hasPatientFromOtherClinic"
            type="primary"
            native-type="submit"
            :loading="loading.form">
            {{ $t(hasPatient ? 'Base.SaveChanges' : 'Patients.AddPatient') }}
          </ElButton>

          <ElButton
            v-show="hasPatientFromOtherClinic"
            type="primary"
            :loading="loading.attach"
            @click="attachPatient">
            {{ $t('Base.Attach') }}
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script>
import { throttle } from 'lodash';
import { Patient } from '@/models/Patient.model';
import { GlobalDrawerAction } from '@/models/client/ModalAndDrawer/GlobalDrawerAction';
import { REGISTRY_PATIENT_ROUTE } from '@/router/registry.routes';

export default {
  name: 'CreatePatientDrawer',
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
      loading: {
        form: false,
        attach: false,
      },
      isChildren: false,
      hasPatient: false,
      hasPatientFromOtherClinic: false,

      throttleCheckHasPatient: null,
    };
  },
  computed: {
    hasPhoneNumber() {
      return this.patient.phone && this.patient.phone.replace(/^\+*/gm, '')?.length;
    },
    isDisabledSecondaryInputs() {
      return this.isChildren ? !this.patient.parent_id : !this.hasPhoneNumber;
    },
  },

  watch: {
    'modelValue': {
      handler() {
        this.patient = new Patient(this.patientProp || {});
      },
      immediate: true,
    },
    'nameOrPhone': {
      handler() {
        this.nameOrPhoneWatcherHandler();
      },
      immediate: true,
    },
    'patient.phone'() {
      this.patientPhoneWatcherHandler();
    },
  },

  methods: {
    async submitHandler() {
      if (this.loading.form) return;
      this.loading.form = true;

      try {
        this.hasPatient ? await this.editPatient() : await this.createPatient();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.form = false;
    },
    async createPatient() {
      const { patient } = await Patient.create(this.patient);

      this.$notify({ type: 'success', title: this.$t('Notifications.SuccessCreated') });
      this.$emit('action', new GlobalDrawerAction({ name: 'created', data: { patient } }));
      this.goToPatient({ patientId: patient.id });
    },
    editPatient() {},

    async attachPatient() {
      if (this.loading.attach) return;
      this.loading.attach = true;

      try {
        const { patient } = await Patient.attachPatient({ patient_id: this.patient.id });

        this.$notify({ type: 'success', title: this.$t('Notifications.SuccessAttached') });
        this.$emit('action', new GlobalDrawerAction({ name: 'attached', data: { patient } }));
        this.goToPatient(patient);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.attach = false;
    },

    goToPatient({ patientId }) {
      this.$router.push({
        name: REGISTRY_PATIENT_ROUTE.name,
        params: {
          id: patientId || this.patient.id,
        },
      });
    },

    async checkHasPatient() {
      this.resetHasPatient();
      const { patient, attach_clinic } = await Patient.checkPatient({ phone: this.patient.phone });
      if (!patient) return;

      this.patient = new Patient(patient);
      this.hasPatient = true;
      this.hasPatientFromOtherClinic = !attach_clinic;
    },
    resetHasPatient() {
      this.hasPatient = false;
      this.hasPatientFromOtherClinic = false;
    },

    nameOrPhoneWatcherHandler() {
      if (!this.nameOrPhone) return;

      const isName = /[a-zA-Zа-яА-Я]/gim.test(this.nameOrPhone);
      isName ? (this.patient.name = this.nameOrPhone) : (this.patient.phone = this.nameOrPhone);
    },
    patientPhoneWatcherHandler() {
      if (!this.hasPhoneNumber) return;
      this.throttleCheckHasPatient();
    },
  },

  mounted() {
    this.throttleCheckHasPatient = throttle(this.checkHasPatient, 300);
    this.patientPhoneWatcherHandler();
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="./index.locales.json" />
