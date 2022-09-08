<template>
  <ElDialog
    custom-class="treatment-modal"
    @update:modelValue="$emit('update:modelValue')">
    <p class="treatment-modal__title">{{ $t('Base.SetTreatment') }}</p>
    <ElForm class="treatment-modal-form" label-position="top">
      <ElInput class="treatment-modal__input" v-model="title" :placeholder="$t('Base.Naming')"> </ElInput>
      <ElInput class="treatment-modal__input" v-model="price" :placeholder="$t('Base.Price')"> </ElInput>
      <ElInput class="treatment-modal__input" v-model="duration" :placeholder="$t('Base.QuantityDays')">  </ElInput>
      <ElButton class="treatment-modal-submit" size="large" type="primary" @click="setTreatment">
        {{ $t('Base.Appoint') }}
      </ElButton>
    </ElForm>
  </ElDialog>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { TreatmentModel } from '@/models/Treatment.model'
import { mapState } from 'vuex'
export default {
  name: 'SetTreatmentModal',
  icons: icons,
  data(){
    return{
      title: '',
      price: '',
      duration: '',
    }
  },
  computed:{
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods:{
   async setTreatment(){
      try {
        await TreatmentModel.create({
          user_id: this.user.id,
          title: this.title,
          appointment_id: this.appointment.id,
          price: this.price,
          duration: this.duration
        });
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }
    }
  }
};
</script>
<style lang="scss" src="./index.scss" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/base.locales.json" />
<style scoped></style>
