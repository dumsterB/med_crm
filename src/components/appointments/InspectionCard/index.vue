<template>
  <ElCard class="default-inspection-card printer__block printer__doc" shadow="never">
    <ElForm
      class="default-inspection-card-form"
      label-position="top"
      id="inspection-card"
      ref="form"
      @submit.prevent="submitHandler">
      <div class="default-inspection-card-form__content">
        <h1 class="printer__title default-inspection-card-form__title">
          {{ $t('Base.InspectionCard') }}
        </h1>

        <!--  PatientCard  -->
        <PatientCardRow
          class="default-inspection-card-form__patient"
          :patient="appointment.patient"
          :items="patientCardItems">
          <template #actions>
            <router-link :to="patientAmbulatoryCardPageLink">
              <ElButton type="primary"> {{ $t('Base.AmbulatoryCard') }} </ElButton>
            </router-link>
          </template>
        </PatientCardRow>

        <!--  Select template  -->
        <ElFormItem v-show="!readonly && !isTreatment" :label="$t('Templates.SelectTemplate')">
          <UiModelsAutocompleteSearch
            v-model="templateId"
            label="title"
            :model-for-use="InspectionCardTemplate"
            :required="!appointment.inspection_card_id"
            :disabled="readonly"
            :default-item="activeTemplate"
            @select="selectTemplate" />
        </ElFormItem>

        <!--  Template & Diagnosis  -->
        <TemplateResult
          class="default-inspection-card-form__template-result"
          v-model="inspectionCard.basic_data"
          :readonly="readonly"
          @change="updateInspectionCard">
          <template #footer>
            <TemplateResultBlock
              v-if="!isTreatment"
              :block="{ label: $t('Appointments.SelectDiagnosis') }">
              <DiseaseCodeSelect
                v-model="inspectionCard.disease_code_codes"
                multiple
                collapse-tags
                collapse-tags-tooltip
                :default-item="appointment.inspection_card?.disease_codes"
                @select="updateInspectionCard" />
            </TemplateResultBlock>
          </template>
        </TemplateResult>
      </div>

      <!--  Actions  -->
      <ElFormItem class="default-inspection-card-form__actions">
        <div class="default-inspection-card-form-actions">
          <ElButton
            v-show="!readonly"
            type="primary"
            native-type="submit"
            :loading="loading.provide">
            {{ $t('Appointments.EndReception') }}
          </ElButton>

          <ElButton v-show="!readonly && !isTreatment" type="warning" plain @click="setTreatment">
            {{ $t('Base.SetTreatment') }}
          </ElButton>

          <ElDivider direction="vertical" class="default-inspection-card-form-actions__divider" />

          <ElButton v-show="!readonly" type="primary" plain @click="setControlAppointment">
            {{ $t('Appointments.SetControlAppointment') }}
          </ElButton>
          <ElButton v-show="!readonly" type="primary" plain @click="setExamination">
            {{ $t('Appointments.SetExamination') }}
          </ElButton>

          <ElButton v-show="readonly" text @click="print">
            <template #icon>
              <UiIcon :icon="icons.PRINTER" />
            </template>
            {{ $t('Base.Print') }}
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>

<script src="./index.js" />

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/templates.locales.json" />
<i18n src="./index.locales.json" />
