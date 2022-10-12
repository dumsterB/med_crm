import { throttle } from 'lodash';
import * as icons from '@/enums/icons.enum.js';
import { insertRouteParams } from '@/utils/router.utils';
import { onlyLatinFormatter } from '@/utils/formatters.util';
import { Patient } from '@/models/Patient.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { PHONE_CONFIRM_MODAL_CONFIRMED_ACTION } from '@/components/PhoneConfirmModal/index.enum';
import { FULL_DATE_FORMAT } from '@/config/dateAndTime.config';

import PhoneConfirmModal from '@/components/PhoneConfirmModal/index.vue';

export default {
  name: 'CreateOrEditPatient',
  components: { PhoneConfirmModal },
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    nameOrPhone: String,
    data: [Patient, Object],

    disableDefaultAction: Boolean, // отключаем дефолтное поведение после создания
  },
  data() {
    return {
      loading: {
        form: false,
        attach: false,
      },
      isChildren: false,
      /** @type Patient */
      patient: null,
      /** @type Patient */
      oldPatient: null,
      hasPatient: false,
      hasPatientFromOtherClinic: false,

      isOpenPhoneConfirmModal: false,
      isRebinding: false, // если пользователь был найден и мы успешно подтвердили код - можем создать новый акк
      code: null, // для хранения кода подтверждения при rebinding или смене номера

      throttleCheckHasPatient: null,
    };
  },
  computed: {
    phone: {
      get() {
        return this.isChildren ? this.patient.parent?.phone : this.patient.phone;
      },
      set(value) {
        if (this.isChildren) this.patient.parent.phone = value;
        else this.patient.phone = value;
      },
    },
    hasPhoneNumber() {
      return !!this.phone;
    },

    oldPatientPageUrl() {
      return insertRouteParams({
        path: PATIENT_ROUTE.path,
        params: { id: this.oldPatient?.id },
      });
    },
    isChildrenSwitchIsDisabled() {
      return !!this.data?.id || !!this.data?.parent_id;
    },
  },

  watch: {
    modelValue: {
      handler() {
        this.patient = new Patient(this.data || {});
        if (this.data?.parent_id) this.isChildren = true;
      },
      immediate: true,
    },
    nameOrPhone: {
      handler() {
        this.nameOrPhoneWatcherHandler();
      },
      immediate: true,
    },
    isChildren: {
      handler(value) {
        this.patient.phone = null;
        this.resetHasPatient();

        if (value) {
          this.patient = new Patient({ ...this.patient, parent: new Patient() });
        }
      },
    },

    phone: {
      handler() {
        this.phoneWatcherHandler();
      },
    },
  },

  methods: {
    async submitHandler() {
      if (this.loading.form) return;
      this.loading.form = true;

      try {
        this.data?.id ? await this.editPatient() : await this.createPatient();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.form = false;
    },

    customValidate() {
      const button = this.$refs.actions.querySelector("button[type='submit']");

      if (this.hasPatient) {
        this.$notify({ type: 'error', title: this.$t('Patients.PatientAlreadyExists') });
        return false;
      }
      if (this.isChildren ? !this.patient?.parent_id : !this.patient.phone || !this.patient.name) {
        button.click();
        this.$notify({ type: 'error', title: this.$t('Notifications.FillRequiredFields') });
        return false;
      }

      return true;
    },

    async createPatient() {
      const { patient } = this.isRebinding
        ? await Patient.rebinding({ patient: this.patient, code: this.code })
        : await Patient.create(this.patient, this.isChildren);

      this.$notify({ type: 'success', title: this.$t('Notifications.SuccessCreated') });

      this.$emit('action', new GlobalModalAction({ name: 'created', data: { patient } }));
      if (!this.disableDefaultAction) this.goToPatient({ patientId: patient.id });
    },

    // проверку телефона для создания нового пациента или смены текущего номера
    async checkPhoneForRebinding(action) {
      if (action.name !== PHONE_CONFIRM_MODAL_CONFIRMED_ACTION) return;

      this.resetHasPatient();
      this.isOpenPhoneConfirmModal = false;
      this.isRebinding = true;
      this.code = action.data.code;
      this.patient = new Patient({ ...(this.data || {}), phone: this.patient.phone });
    },

    async editPatient() {
      if (this.data.phone !== this.patient.phone && !this.isRebinding)
        return (this.isOpenPhoneConfirmModal = true);

      const { data } = await Patient.update({
        id: this.patient.id,
        payload: this.isRebinding ? { ...this.patient, code: this.code } : this.patient,
      });

      this.$emit(
        'action',
        new GlobalModalAction({ name: 'updated', data: { patient: data.data } })
      );
      this.$notify({ type: 'success', title: this.$t('Notifications.SuccessUpdated') });
    },

    // привязать к нашей клинике
    async attachPatient() {
      if (this.loading.attach) return;
      this.loading.attach = true;

      try {
        const { patient } = await Patient.attachPatient({ patient_id: this.oldPatient.id });

        this.$notify({ type: 'success', title: this.$t('Notifications.SuccessAttached') });
        this.$emit('action', new GlobalModalAction({ name: 'attached', data: { patient } }));
        if (!this.disableDefaultAction)
          this.goToPatient({ patient: patient, patientId: patient.id });
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
      if (this.isChildren) this.resetPatientParent();
      else this.resetHasPatient();

      const { patient, attach_clinic } = await Patient.checkPatient({ phone: this.phone });
      if (!patient) return;

      if (this.isChildren && patient) {
        this.patient.parent_id = patient.id;
        this.patient.parent = patient;
      }
      if (!this.isChildren) {
        this.oldPatient = patient;
        this.hasPatient = true;
        this.hasPatientFromOtherClinic = !attach_clinic;
      }
    },
    resetHasPatient() {
      this.isRebinding = false;
      this.oldPatient = null;
      this.hasPatient = false;
      this.hasPatientFromOtherClinic = false;
    },
    resetPatientParent() {
      this.patient.parent_id = null;
      this.patient.parent.name = null;
    },

    goToPatient({ patientId }) {
      this.$router.push({
        name: PATIENT_ROUTE.name,
        params: {
          id: patientId || this.patient.id,
        },
      });
    },

    nameOrPhoneWatcherHandler() {
      if (!this.nameOrPhone) return;

      const isName = this.queryIsName(this.nameOrPhone);
      isName ? (this.patient.name = this.nameOrPhone) : (this.patient.phone = this.nameOrPhone);
    },
    phoneWatcherHandler() {
      if (!this.hasPhoneNumber) return;
      this.throttleCheckHasPatient();
    },
    queryIsName(query) {
      return /[a-zA-Zа-яА-Я?\s]/gim.test(query);
    },
  },

  mounted() {
    this.throttleCheckHasPatient = throttle(this.checkHasPatient, 300);
    // Не запускаем при редактировании
    if (!this.data) this.phoneWatcherHandler();
  },

  setup: () => ({
    FULL_DATE_FORMAT: FULL_DATE_FORMAT,
    Patient,
    icons,
    onlyLatinFormatter,
  }),
};
