<template>
  <ElDialog :model-value="modelValue">
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
      <p class="phone-confirm-modal-codeRepeat" v-if="timerCount > 0">
        {{ $t('Waiting') }} {{ timerCount }}
      </p>
      <p class="phone-confirm-modal-codeRepeat" @click="sendCode" v-else>
        <UiIcon class="phone-confirm-modal-codeRepeat__icon" :icon="$options.icons.RELOAD" />
        {{ $t('CodeRepeat') }}
      </p>
      <br />
      <ElButton class="phone-confirm-modal__cancel" @click="closeModal">{{
        $t('Base.Cancel')
      }}</ElButton>
    </ElForm>
  </ElDialog>
</template>

<script>
import { Patient } from '@/models/Patient.model';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import { PHONE_CONFIRM_MODAL_CONFIRMED_ACTION } from '@/components/PhoneConfirmModal/index.enum';
import * as icons from '@/enums/icons.enum.js';
import VOtpInput from 'vue3-otp-input';
let interval;
export default {
  name: 'PhoneConfirmModal',
  emits: ['update:modelValue', 'action'],
  icons: icons,
  components: {
    VOtpInput,
  },
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
      timerEnabled: true,
      timerCount: 10,
      intervalTime: 10,
      interval: null,
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
    createInterval() {
      this.timerCount = this.intervalTime;
      this.timerEnabled = true;
      this.interval = setInterval(() => {
        if (this.timerCount === 0) {
          clearInterval(this.interval);
          this.interval = null
          setTimeout(()=>{
            this.timerEnabled = false;
          },)
          return;
        }
        this.timerCount--;
      }, 1000);
    },
    async handleOnComplete(value) {
      this.code = value;
      if (this.loading.check) return;
      this.loading.check = true;

      try {
        await Patient.checkCodeFromPhone({ phone: this.phone, code: this.code });
        console.log('toast');
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