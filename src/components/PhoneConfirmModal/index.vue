<template>
  <ElDialog
    :model-value="modelValue"
    custom-class="phone-confirm-modal"
    @update:modelValue="$emit('update:modelValue')">
    <ElForm class="phone-confirm-modal-form" label-position="top">
      <p class="phone-confirm-modal__title">{{ $t('WriteCode') }}</p>
      <p class="phone-confirm-modal__text">{{ $t('SendedCode') }}</p>

      <div class="phone-confirm-modal-code">
        <VOtpInput
          ref="otpInput"
          input-classes="otp-input"
          :num-inputs="4"
          separator=""
          :should-auto-focus="true"
          :is-input-num="true"
          :conditionalClass="['one', 'two', 'three', 'four']"
          :placeholder="['-', '-', '-', '-']"
          @on-complete="handleOnComplete" />
      </div>
      <p v-show="timerCount > 0" class="phone-confirm-modal-codeRepeat">
        {{ $t('Waiting') }} {{ timerCount }}
      </p>
      <p v-show="timerCount <= 0" class="phone-confirm-modal-codeRepeat" @click="sendCode">
        <UiIcon class="phone-confirm-modal-codeRepeat__icon" :icon="$options.icons.RELOAD" />
        {{ $t('CodeRepeat') }}
      </p>

      <ElButton class="phone-confirm-modal__cancel" @click="closeModal">
        {{ $t('Base.Cancel') }}
      </ElButton>
    </ElForm>
  </ElDialog>
</template>

<script>
import { Patient } from '@/models/Patient.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import { PHONE_CONFIRM_MODAL_CONFIRMED_ACTION } from '@/components/PhoneConfirmModal/index.enum';
import * as icons from '@/enums/icons.enum.js';
import VOtpInput from 'vue3-otp-input';

export default {
  name: 'PhoneConfirmModal',
  emits: ['update:modelValue', 'action'],
  icons: icons,
  components: { VOtpInput },
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
      timerCount: 10,
      intervalTime: 10,
      interval: null,
    };
  },
  watch: {
    modelValue: {
      handler(value) {
        if (value && this.phone) this.sendCode();
        if (!value) this.clearInterval();
      },
      immediate: true,
    },
  },

  methods: {
    createInterval() {
      this.timerCount = this.intervalTime;
      this.interval = setInterval(() => {
        if (this.timerCount === 0) return this.clearInterval();
        this.timerCount--;
      }, 1000);
    },
    clearInterval() {
      clearInterval(this.interval);
      this.interval = null;
    },

    async handleOnComplete(value) {
      this.code = value;
      if (this.loading.check) return;
      this.loading.check = true;

      try {
        await Patient.checkCodeFromPhone({ phone: this.phone, code: this.code });
        this.$notify({
          type: 'success',
          title: this.$t('Success'),
        });
        this.$emit(
          'action',
          new GlobalModalAction({
            name: PHONE_CONFIRM_MODAL_CONFIRMED_ACTION,
            data: { code: this.code },
          })
        );
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.check = false;
    },

    async sendCode() {
      if (this.loading.send) return;
      this.loading.send = true;

      try {
        await Patient.sendCodeOnPhone({ phone: this.phone });
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.createInterval();
      this.loading.send = false;
    },
    closeModal() {
      this.$emit('update:modelValue');
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
