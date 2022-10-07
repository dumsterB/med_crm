<!--  TODO: перебиравть поля циклом когда будут известны все поля и их типы  -->

<template>
  <ElCard class="ambulatory-cards printer__block printer__doc" shadow="never">
    <h1 class="printer__title">{{ $t('Base.AmbulatoryCard') }}</h1>
    <PatientCardRow class="ambulatory-patient-card" :patient="patient"></PatientCardRow>
    <ElCard class="ambulatory-card" shadow="never">
      <ElForm label-position="top">

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
      <div class="ambulatory-cards__actions ambulatory-cards-actions">
        <ElButton type="primary" :loading="loading" @click="saveChanges">
          {{ $t('Base.SaveChanges') }}
        </ElButton>
        <ElButton text @click="print">
          <template #icon>
            <UiIcon :icon="icons.PRINTER" />
          </template>
          {{ $t('Base.Print') }}
        </ElButton>
      </div>
    </ElCard>

    <ElCard class="ambulatory-patient-card">
      <TreatmentsTable
        :total="treatments?.length"
        :perPage="treatments?.length"
        :page="1"
        :action_show="true"
        :items="treatments" />
    </ElCard>
  </ElCard>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { AmbulatoryCard } from '@/models/AmbulatoryCard.model';
import { Patient } from '@/models/Patient.model';
import { User } from '@/models/User.model';
import TreatmentsTable from '@/components/treatments/TreatmentsTable/index.vue';
import PatientCardRow from '../PatientCardRow/index.vue';

export default {
  name: 'AmbulatoryCard',
  emits: ['update:patient'],
  components: {
    TreatmentsTable,
    PatientCardRow,
  },
  props: {
    patient: [User, Patient, Object],
    treatments: Array,
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

    print() {
      window.print();
    },
  },

  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="./index.locales.json" />
