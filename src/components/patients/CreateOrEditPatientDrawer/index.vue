<template>
  <ElDrawer
    :model-value="modelValue"
    :title="data && data.id ? $t('Patients.EditPatient') : $t('Patients.AddPatient')"
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
        <UiModelsAutocompleteSearch
          v-model="patient.parent_id"
          required
          :modelForUse="$options.Patient" />
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

      <ElFormItem v-if="!data && hasPatient">
        <div class="create-patient-drawer-patient">
          <div class="create-patient-drawer-patient__title">Пациент уже существует</div>
          <ElButton type="primary" @click="checkPhoneForRebinding">Отвязать</ElButton>

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
            {{ $t(data || hasPatient ? 'Base.SaveChanges' : 'Patients.AddPatient') }}
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
import { PHONE_CONFIRM_MODAL_CONFIRMED_ACTION } from '@/components/PhoneConfirmModal/index.enum';
import PhoneConfirmModal from '@/components/PhoneConfirmModal/index.vue';

export default {
  name: 'CreateOrEditPatientDrawer',
  emits: ['update:modelValue', 'action'],
  Patient: Patient,
  props: {
    modelValue: Boolean,
    nameOrPhone: String,
    data: [Patient, Object],
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

      isRebinding: false, // если пользователь был найден и мы успешно подтвердили код - можем создать новый акк
      code: null, // для хранения кода подтверждения при rebinding

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
        this.patient = new Patient(this.data || {});
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
        this.data || this.hasPatient ? await this.editPatient() : await this.createPatient();
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
      const { patient } = this.isRebinding
        ? await Patient.rebinding({ patient: this.patient, code: this.code })
        : await Patient.create(this.patient);

      this.$notify({ type: 'success', title: this.$t('Notifications.SuccessCreated') });
      this.$emit('action', new GlobalDrawerAction({ name: 'created', data: { patient } }));
      this.goToPatient({ patientId: patient.id });
    },
    async checkPhoneForRebinding() {
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: PhoneConfirmModal,
        payload: {
          phone: this.patient.phone,
        },
      });
      if (action.name !== PHONE_CONFIRM_MODAL_CONFIRMED_ACTION) return;

      this.resetHasPatient();
      this.isRebinding = true;
      this.code = action.data.code;
      this.patient = new Patient({ phone: this.patient.phone });
    },

    async editPatient() {
      if (this.hasPatient)
        return this.$notify({ type: 'error', title: this.$t('Notifications.NumberIsBusy') });
      if (this.data.phone !== this.patient.phone) return this.checkThenEditPatientByPhone();

      const { data } = await Patient.update({ id: this.patient.id, payload: this.patient });

      this.$emit(
        'action',
        new GlobalDrawerAction({ name: 'updated', data: { patient: data.data } })
      );
      this.$notify({ type: 'success', title: this.$t('Notifications.SuccessUpdated') });
    },
    async checkThenEditPatientByPhone() {
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: PhoneConfirmModal,
        payload: {
          phone: this.patient.phone,
        },
      });

      if (action.name !== PHONE_CONFIRM_MODAL_CONFIRMED_ACTION) return;

      // this.$emit(
      //   'action',
      //   new GlobalDrawerAction({ name: 'updated', data: { patient: data.data } })
      // );
      // this.$notify({ type: 'success', title: this.$t('Notifications.SuccessUpdated') });
    },

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

    async checkHasPatient() {
      this.resetHasPatient();
      const { patient, attach_clinic } = await Patient.checkPatient({ phone: this.patient.phone });
      if (!patient) return;

      this.patient = new Patient(patient);
      this.hasPatient = true;
      this.hasPatientFromOtherClinic = !attach_clinic;
    },
    resetHasPatient() {
      this.isRebinding = false;
      this.hasPatient = false;
      this.hasPatientFromOtherClinic = false;
    },

    goToPatient({ patientId }) {
      this.$router.push({
        name: REGISTRY_PATIENT_ROUTE.name,
        params: {
          id: patientId || this.patient.id,
        },
      });
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
    // Не запускаем при редактировании
    if (!this.data) this.patientPhoneWatcherHandler();
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="./index.locales.json" />
