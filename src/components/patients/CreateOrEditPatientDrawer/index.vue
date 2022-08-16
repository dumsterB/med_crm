<template>
  <ElDrawer
    :model-value="modelValue"
    :title="data && data.id ? $t('Patients.EditPatient') : $t('Patients.AddPatient')"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm class="create-patient-drawer-form" label-position="top" @submit.prevent="submitHandler">
      <!--  Is Children  -->
      <ElFormItem v-show="!isChildrenSwitchIsDisabled">
        <ElSwitch :active-text="$t('User.IsChildren')" v-model="isChildren" />
      </ElFormItem>

      <!--  Phone  -->
      <ElFormItem v-if="!isChildren" :label="$t('User.Phone')">
        <UiPhoneInput v-model="patient.phone" required />
      </ElFormItem>

      <!--  Parent  -->
      <ElFormItem v-if="isChildren" :label="$t('User.Parent')">
        <UiModelsAutocompleteSearch
          v-model="patient.parent_id"
          :modelForUse="Patient"
          :searchQuery="{ query_field: ['name', 'phone'] }"
          :defaultItem="data?.parent"
          required />
      </ElFormItem>

      <div v-show="isChildren || (hasPhoneNumber && !hasPatient)">
        <!--  FullName  -->
        <ElFormItem :label="$t('User.FullName')">
          <ElInput v-model="patient.name" required :disabled="isDisabledSecondaryInputs" />
        </ElFormItem>

        <!--  Gender  -->
        <ElFormItem :label="$t('User.Gender')">
          <UiGenderSelect v-model="patient.gender" required :disabled="isDisabledSecondaryInputs" />
        </ElFormItem>

        <!--  Birthdate  -->
        <ElFormItem :label="$t('User.Birthdate')">
          <ElDatePicker
            v-model="patient.birthdate"
            type="date"
            :placeholder="$t('Base.SelectDate')"
            :value-format="FULL_DATE_FORMAT"
            required
            :disabled="isDisabledSecondaryInputs" />

          <UiRequiredHiddenInput :modelValue="patient.birthdate" />
        </ElFormItem>
      </div>

      <!--  OldPatient  -->
      <ElFormItem v-show="hasPatient">
        <div class="create-patient-drawer-patient">
          <div class="create-patient-drawer-patient__title">Пациент есть в системе</div>
          <router-link
            v-show="!hasPatientFromOtherClinic"
            class="create-patient-drawer-patient__name"
            :to="oldPatientPageUrl">
            {{ oldPatient?.name }}
          </router-link>
        </div>
      </ElFormItem>

      <!--  Actions  -->
      <ElFormItem>
        <div class="create-patient-drawer-form-actions">
          <ElButton
            v-show="!hasPatient"
            type="primary"
            native-type="submit"
            :loading="loading.form"
            :disabled="hasPatient">
            {{ $t(data?.id ? 'Base.SaveChanges' : 'Patients.AddPatient') }}
          </ElButton>

          <!--  hasPatient && !hasPatientFromOtherClinic  -->
          <router-link v-show="hasPatient && !hasPatientFromOtherClinic" :to="oldPatientPageUrl">
            <ElButton type="primary" plain>{{ $t('GoToPatient') }} </ElButton>
          </router-link>
          <ElButton
            v-show="data?.id ? hasPatient : hasPatient && !hasPatientFromOtherClinic"
            type="primary"
            @click="checkPhoneForRebinding">
            {{ $t(data ? 'RebindPhone' : 'CreateNewPatient') }}
          </ElButton>

          <ElButton
            v-show="hasPatientFromOtherClinic && !data"
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
