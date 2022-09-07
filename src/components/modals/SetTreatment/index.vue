<template>
  <ElDialog
    :model-value="modelValue"
    custom-class="treatment-modal"
    @update:modelValue="$emit('update:modelValue')">
    <p class="treatment-modal__title">{{ $t('Base.SetTreatment') }}</p>
    <ElForm class="treatment-modal-form" label-position="top">
      <ElInput class="treatment-modal__input" v-model="name" :placeholder="$t('Base.Naming')"> </ElInput>
      <ElInput class="treatment-modal__input" v-model="price" :placeholder="$t('Base.Price')"> </ElInput>
      <ElInput class="treatment-modal__input" v-model="days" :placeholder="$t('Base.QuantityDays')">  </ElInput>
      <ElButton class="treatment-modal-submit" size="large" type="primary" @click="setTreatment">
        {{ $t('Base.Appoint') }}
      </ElButton>
    </ElForm>
  </ElDialog>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'SetTreatmentModal',
  icons: icons,
  data(){
    return{
      name: '',
      price: '',
      days: '',
    }
  },
  methods:{
    setTreatment(){

    }
  }
};
</script>
<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/base.locales.json" />
<style scoped></style>
