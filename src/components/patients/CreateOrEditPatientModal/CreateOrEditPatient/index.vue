<template>
  <ElForm
    class="create-or-edit-patient"
    label-position="top"
    ref="form"
    id="data"
    @submit.prevent="submitHandler">
    <div class="create-or-edit-patient__content">
      <!--  Is Children  -->
      <ElFormItem v-show="!isChildrenSwitchIsDisabled">
        <ElSwitch :active-text="$t('User.IsChildren')" v-model="isChildren" />
      </ElFormItem>

      <!--  Phone  -->
      <ElFormItem v-if="!isChildren" :label="$t('User.Phone')">
        <UiPhoneInput class="create-or-edit-patient__field" v-model="patient.phone" required />
      </ElFormItem>

      <!--  Parent  -->
      <ElFormItem v-if="isChildren" :label="$t('User.Parent')">
        <UiModelsAutocompleteSearch
          class="create-or-edit-patient__field"
          v-model="patient.parent_id"
          :model-for-use="Patient"
          :search-query="{ query_field: ['name', 'phone'] }"
          :default-item="data?.parent || parent"
          show-create-option
          required
          @create="createParentFlow" />
      </ElFormItem>

      <div v-show="isChildren || (hasPhoneNumber && !hasPatient)">
        <!--  FullName  -->
        <ElFormItem :label="$t('User.FullName') + ` (${$t('User.FullNameFormat').toLowerCase()})`">
          <ElInput
            class="create-or-edit-patient__field"
            v-model="patient.name"
            minlength="3"
            required
            :disabled="isDisabledSecondaryInputs"
            pattern="[a-zA-Z\d\s]*" />
        </ElFormItem>

        <!--  Birthdate  -->
        <ElFormItem :label="$t('User.Birthdate')">
          <UiDateInput v-model="patient.birthdate" />
          <!--          <ElDatePicker
            v-model="patient.birthdate"
            type="date"
            placeholder="00.00.2000"
            format="DD.MM.YYYY"
            :value-format="FULL_DATE_FORMAT"
            :disabled="isDisabledSecondaryInputs" />-->
        </ElFormItem>

        <!--  Gender  -->
        <ElFormItem :label="$t('User.Gender')">
          <UiGenderSelect
            class="create-or-edit-patient__field"
            v-model="patient.gender"
            required
            :disabled="isDisabledSecondaryInputs" />
        </ElFormItem>
      </div>

      <!--  OldPatient  -->
      <ElFormItem v-show="hasPatient">
        <div class="create-patient-modal-patient">
          <div class="create-patient-modal-patient__title">{{ $t('PatientIsInSystem') }}</div>

          <router-link
            v-show="!hasPatientFromOtherClinic"
            class="create-patient-modal-patient__name"
            :to="oldPatientPageUrl">
            {{ oldPatient?.name }}
          </router-link>
          <div v-show="hasPatientFromOtherClinic" class="create-patient-modal-patient__name">
            {{ oldPatient?.name }}
          </div>
        </div>
      </ElFormItem>
    </div>

    <!--  Actions  -->
    <div class="create-or-edit-patient-actions">
      <ElButton
        v-show="!hasPatient"
        type="primary"
        form="data"
        native-type="submit"
        :loading="loading.form"
        :disabled="hasPatient">
        {{ $t(data?.id ? 'Base.SaveChanges' : 'Patients.AddPatient') }}
      </ElButton>

      <!--  hasPatient && !hasPatientFromOtherClinic  -->
      <router-link v-show="hasPatient && !hasPatientFromOtherClinic" :to="oldPatientPageUrl">
        <ElButton type="primary">{{ $t('GoToPatient') }} </ElButton>
      </router-link>

      <ElButton
        v-show="data?.id ? hasPatient : hasPatient && !hasPatientFromOtherClinic"
        type="primary"
        form="data"
        @click="isOpenPhoneConfirmModal = true">
        {{ $t(data ? 'RebindPhone' : 'CreateNewPatient') }}
      </ElButton>

      <ElButton
        v-show="hasPatientFromOtherClinic && !data"
        type="primary"
        form="data"
        :loading="loading.attach"
        @click="attachPatient">
        {{ $t('Base.Attach') }}
      </ElButton>
    </div>

    <PhoneConfirmModal
      v-model="isOpenPhoneConfirmModal"
      :phone="this.patient.phone"
      append-to-body
      @action="checkPhoneForRebinding" />
  </ElForm>
</template>

<script src="./index.js" />

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="./index.locales.json" />
