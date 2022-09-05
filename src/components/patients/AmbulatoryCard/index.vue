<!--  TODO: перебиравть поля циклом когда будут известны все поля и их типы  -->

<template>
  <ElCard class="ambulatory-card" shadow="never">
    <ElForm label-position="top">
      <ElFormItem label="FIO"> <ElInput v-model="localPatient.name" /> </ElFormItem>
      <ElFormItem label="birthdate">
        <ElDatePicker v-model="localPatient.birthdate" />
      </ElFormItem>

      <ElFormItem label="phone">
        <UiPhoneInput v-model="localPatient.phone" />
      </ElFormItem>

      <ElFormItem label="место проживания">
        <ElInput v-model="localAmbulatoryCard.place_residence" />
      </ElFormItem>

      <ElFormItem label="Учёба - работа">
        <ElInput v-model="localAmbulatoryCard.study_work" />
      </ElFormItem>

      <ElFormItem label="Диспансеризация">
        <ElInput v-model="localAmbulatoryCard.clinical_examination" />
      </ElFormItem>

      <ElFormItem label="Место лечения">
        <ElInput v-model="localAmbulatoryCard.place_treatment" />
      </ElFormItem>

      <ElFormItem label="Группа крови и резус фактор ">
        <ElInput v-model="localAmbulatoryCard.blood_type_rh_factor" />
      </ElFormItem>

      <ElFormItem label="Аллергия">
        <ElInput v-model="localAmbulatoryCard.allergy" />
      </ElFormItem>

      <ElFormItem label="Реакция">
        <ElInput v-model="localAmbulatoryCard.reaction" />
      </ElFormItem>

      <ElFormItem label="Переливание крови ">
        <ElInput v-model="localAmbulatoryCard.blood_transfusion" />
      </ElFormItem>

      <ElFormItem label="Хирургические вмешательсто">
        <ElInput v-model="localAmbulatoryCard.surgical_intervention" />
      </ElFormItem>

      <ElFormItem label="Сахарный диабет ">
        <ElInput v-model="localAmbulatoryCard.diabetes" />
      </ElFormItem>

      <ElFormItem label="Инфекционное заболевание ">
        <ElInput v-model="localAmbulatoryCard.infectious_diseases" />
      </ElFormItem>

      <ElFormItem label="Рост">
        <ElInput v-model="localAmbulatoryCard.height" />
      </ElFormItem>

      <ElFormItem label="Вес">
        <ElInput v-model="localAmbulatoryCard.weight" />
      </ElFormItem>

      <ElFormItem label="Флюраграфия">
        <ElInput v-model="localAmbulatoryCard.fluorography" />
      </ElFormItem>
    </ElForm>

    <ElDivider />
    <div class="ambulatory-card__actions ambulatory-card-actions">
      <ElButton type="primary" :loading="loading" @click="saveChanges">Save</ElButton>
    </div>
  </ElCard>
</template>

<script>
import { AmbulatoryCard } from '@/models/AmbulatoryCard.model';
import { Patient } from '@/models/Patient.model';
import { User } from '@/models/User.model';

export default {
  name: 'AmbulatoryCard',
  emits: ['update:patient'],
  props: {
    patient: [User, Patient, Object],
  },
  data() {
    return {
      /** @type {Patient} */
      localPatient: null,
      /** @type {AmbulatoryCard} */
      localAmbulatoryCard: null,

      loading: false,
    };
  },

  watch: {
    'patient': {
      handler(val) {
        this.localPatient = val;
      },
      immediate: true,
      deep: true,
    },
    'patient.ambulatory_card': {
      handler(val) {
        this.localAmbulatoryCard = val || new AmbulatoryCard();
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async saveChanges() {
      if (this.loading) return;
      this.loading = true;

      try {
        const payloadFromCard = await AmbulatoryCard.save(
          this.patient.id,
          this.localAmbulatoryCard
        );
        const payloadFromPatient = await Patient.update({
          id: this.patient.id,
          payload: this.localPatient,
        });

        this.$emit('update:patient', {
          ...payloadFromPatient.data.data,
        });
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
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
