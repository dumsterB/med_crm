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
          :modelForUse="Patient"
          :searchQuery="{ query_field: ['name', 'phone'] }"
          required />
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

      <ElFormItem v-if="hasPatient">
        <div class="create-patient-drawer-patient">
          <div class="create-patient-drawer-patient__title">
            Пациент на этом номере уже существует
          </div>
          <ElButton type="primary" @click="checkPhoneForRebinding">Отвязать</ElButton>

          <ElButton v-if="!hasPatientFromOtherClinic" @click="goToPatient">
            go to patient
          </ElButton>
        </div>
      </ElFormItem>

      <ElFormItem>
        <div class="create-patient-drawer-form-actions">
          <ElButton
            v-show="!hasPatientFromOtherClinic"
            type="primary"
            native-type="submit"
            :loading="loading.form"
            :disabled="hasPatient">
            {{ $t(data ? 'Base.SaveChanges' : 'Patients.AddPatient') }}
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

<script src="./index.js" />

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="./index.locales.json" />
