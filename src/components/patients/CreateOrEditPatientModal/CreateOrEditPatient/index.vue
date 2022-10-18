<template>
  <ElForm
    id="create-or-edit-patient"
    class="create-or-edit-patient"
    label-position="top"
    ref="form"
    @submit.prevent="submitHandler">
    <div class="create-or-edit-patient__content">
      <!--  Is Children  -->
      <ElFormItem v-show="!isChildrenSwitchIsDisabled">
        <ElSwitch :active-text="$t('User.IsChildren')" v-model="isChildren" />
      </ElFormItem>

      <!--  Phone  -->
      <ElFormItem :label="$t(isChildren ? 'ParentPhone' : 'User.Phone')">
        <UiPhoneInput class="create-or-edit-patient__field" v-model="phone" required />
      </ElFormItem>

      <!--  Parent  -->
      <ElFormItem v-if="isChildren" v-show="hasPhoneNumber" :label="$t('ParentFullName')">
        <ElInput
          :model-value="patient.parent.name"
          required
          :disabled="!!patient.parent_id"
          @update:model-value="patient.parent.name = onlyLatinFormatter($event)" />
      </ElFormItem>

      <div v-show="hasPhoneNumber && !hasPatient">
        <!--  FullName  -->
        <ElFormItem :label="$t('User.FullName') + ` (${$t('User.FullNameFormat').toLowerCase()})`">
          <ElInput
            class="create-or-edit-patient__field"
            :model-value="patient.name"
            minlength="3"
            required
            pattern="[a-zA-Z\d\s]*"
            @update:modelValue="patient.name = onlyLatinFormatter($event)" />
        </ElFormItem>

        <!--  Birthdate  -->
        <ElFormItem :label="$t('User.Birthdate')">
          <UiDateInput v-model="patient.birthdate" />
          <!--          <ElDatePicker
            v-model="patient.birthdate"
            type="date"
            placeholder="00.00.2000"
            format="DD.MM.YYYY"
            :value-format="FULL_DATE_FORMAT" />-->
        </ElFormItem>

        <!--  Gender  -->
        <ElFormItem :label="$t('User.Gender')">
          <UiGenderSelect class="create-or-edit-patient__field" v-model="patient.gender" required />
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
    <div class="create-or-edit-patient-actions" ref="actions">
      <ElButton
        v-show="!hasPatient"
        type="primary"
        form="create-or-edit-patient"
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
        @click="isOpenPhoneConfirmModal = true">
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
