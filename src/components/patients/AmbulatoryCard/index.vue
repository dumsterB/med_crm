<!--  TODO: перебиравть поля циклом когда будут известны все поля и их типы  -->

<template>
  <div class="ambulatory">
    <ElCard class="ambulatory-patient-card">
      <div class="ambulatory-patient-card-info_avatar">
        <div>
          <UiAvatar size="large" :gender="patient.gender"></UiAvatar>
        </div>
        <div>
          <p class="ambulatory-patient-card-info__title">
            {{ $t('Base.NamePatient') }}
          </p>
          <p class="ambulatory-patient-card-info__description">
            {{ patient.name }}
          </p>
        </div>
      </div>
      <div class="ambulatory-patient-card-info">
        <p class="ambulatory-patient-card-info__title">
          {{ $t('User.Phone') }}
        </p>
        <p class="ambulatory-patient-card-info__description">
          {{ patient.phone }}
        </p>
      </div>
      <div class="ambulatory-patient-card-info">
        <p class="ambulatory-patient-card-info__title">
          {{ $t('User.Birthdate') }}
        </p>
        <p class="ambulatory-patient-card-info__description">
          {{ patient.birthdate }}
        </p>
      </div>
      <div class="ambulatory-patient-card-info">
        <p class="ambulatory-patient-card-info__title">
          {{ $t('User.Gender') }}
        </p>
        <p class="ambulatory-patient-card-info__description">
          {{ patient.gender }}
        </p>
      </div>
    </ElCard>
    <ElCard class="ambulatory-card" shadow="never">
      <ElForm label-position="top">
        <ElFormItem :label="$t('User.FullName')">
          <ElInput v-model="localPatient.name" />
        </ElFormItem>
        <ElFormItem :label="$t('User.Birthdate')">
          <ElDatePicker v-model="localPatient.birthdate" />
        </ElFormItem>

        <ElFormItem :label="$t('User.Phone')">
          <UiPhoneInput v-model="localPatient.phone" />
        </ElFormItem>

        <ElFormItem :label="$t('User.PlaceResidence')">
          <ElInput v-model="localAmbulatoryCard.place_residence" />
        </ElFormItem>

        <ElFormItem :label="$t('User.StudyWork')">
          <ElInput v-model="localAmbulatoryCard.study_work" />
        </ElFormItem>

        <ElFormItem :label="$t('Base.ClinicalExamination')">
          <ElInput v-model="localAmbulatoryCard.clinical_examination" />
        </ElFormItem>

        <ElFormItem :label="$t('User.PlaceTreatment')">
          <ElInput v-model="localAmbulatoryCard.place_treatment" />
        </ElFormItem>

        <ElFormItem :label="$t('User.BloodTypeRhFactor')">
          <ElInput v-model="localAmbulatoryCard.blood_type_rh_factor" />
        </ElFormItem>

        <ElFormItem :label="$t('Base.Allergy')">
          <ElInput v-model="localAmbulatoryCard.allergy" />
        </ElFormItem>

        <ElFormItem :label="$t('Base.Reaction')">
          <ElInput v-model="localAmbulatoryCard.reaction" />
        </ElFormItem>

        <ElFormItem :label="$t('Base.BloodTransfusion')">
          <ElInput v-model="localAmbulatoryCard.blood_transfusion" />
        </ElFormItem>

        <ElFormItem :label="$t('Base.SurgicalIntervention')">
          <ElInput v-model="localAmbulatoryCard.surgical_intervention" />
        </ElFormItem>

        <ElFormItem :label="$t('Base.Diabetes')">
          <ElInput v-model="localAmbulatoryCard.diabetes" />
        </ElFormItem>

        <ElFormItem :label="$t('Base.InfectiousDiseases')">
          <ElInput v-model="localAmbulatoryCard.infectious_diseases" />
        </ElFormItem>

        <ElFormItem :label="$t('User.Height')">
          <ElInput v-model="localAmbulatoryCard.height" />
        </ElFormItem>

        <ElFormItem :label="$t('User.Weight')">
          <ElInput v-model="localAmbulatoryCard.weight" />
        </ElFormItem>

        <ElFormItem :label="$t('Base.Fluorography')">
          <ElInput v-model="localAmbulatoryCard.fluorography" />
        </ElFormItem>
      </ElForm>

      <ElDivider />
    </ElCard>
    <ElCard class="ambulatory-patient-card">
      <TreatmentsTable
        :total="treatments?.length"
        :perPage="treatments?.length"
        :page="1"
        :type="true"
        :items="treatments"
      />
    </ElCard>
    <div class="ambulatory-card__actions ambulatory-card-actions">
      <ElButton type="primary" :loading="loading" @click="saveChanges">
        {{ $t('Base.SaveChanges') }}
      </ElButton>
    </div>
  </div>
</template>

<script>
import { AmbulatoryCard } from '@/models/AmbulatoryCard.model';
import { Patient } from '@/models/Patient.model';
import { User } from '@/models/User.model';
import TreatmentsTable from '@/components/treatments/TreatmentsTable/index.vue';

export default {
  name: 'AmbulatoryCard',
  emits: ['update:patient'],
  props: {
    patient: [User, Patient, Object],
    treatments: Array,
  },
  components:{
    TreatmentsTable
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
        this.localAmbulatoryCard = val || new AmbulatoryCard(val || {});
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
        await Patient.update({
          id: this.patient.id,
          payload: this.localPatient,
        });
        const payloadFromCard = await AmbulatoryCard.save(
          this.patient.id,
          this.localAmbulatoryCard
        );

        this.$emit('update:patient', {
          ...payloadFromCard.data.data,
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
<i18n src="@/locales/user.locales.json" />
<i18n src="./index.locales.json" />
