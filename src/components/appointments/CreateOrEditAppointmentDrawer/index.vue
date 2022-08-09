<template>
  <ElDrawer
    custom-class="create-appointment-drawer"
    :model-value="modelValue"
    :title="$t(`Title.${data ? 'Edit' : 'Create'}`)"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm
      class="create-appointment-drawer-form"
      label-position="top"
      @submit.prevent="createAppointment">
      <!--  Patient  -->
      <ElFormItem
        :label="$t('Base.Patient')"
        :style="{ order: this.appointmentFieldsFlexOrder.patient }">
        <UiModelsAutocompleteSearch
          v-model="appointment.patient_id"
          :modelForUse="Patient"
          :defaultItem="patient"
          :disabled="!!patient"
          required />
      </ElFormItem>

      <!--  Type  -->
      <ElFormItem
        :label="$t('SelectType')"
        :style="{ order: this.appointmentFieldsFlexOrder.type }">
        <ElRadioGroup v-model="appointmentType">
          <ElRadio :label="appointmentTypesEnum.Doctor">
            {{ $t(`Appointments.Types.${appointmentTypesEnum.Doctor}`) }}</ElRadio
          >
          <ElRadio :label="appointmentTypesEnum.Service">
            {{ $t(`Appointments.Types.${appointmentTypesEnum.Service}`) }}</ElRadio
          >
        </ElRadioGroup>
      </ElFormItem>

      <!--  Specialty  -->
      <ElFormItem
        v-show="appointmentType === appointmentTypesEnum.Doctor"
        :label="$t('SelectSpecialty')"
        :style="{ order: this.appointmentFieldsFlexOrder.specialty }">
        <SpecialtiesSelect
          v-model="appointment.specialty_id"
          :disabled="specialtiesIsDisabled"
          :required="appointmentType === appointmentTypesEnum.Doctor" />
      </ElFormItem>

      <!--  GroupService  -->
      <ElFormItem
        v-show="appointmentType === appointmentTypesEnum.Service"
        :label="$t('SelectService')"
        :style="{ order: this.appointmentFieldsFlexOrder.groupService }">
        <UiModelsAutocompleteSearch
          v-model="appointment.group_service_id"
          :modelForUse="ServiceGroup"
          label="title"
          :searchQuery="groupServicesSearchQuery"
          :disabled="groupServiceIsDisabled"
          :required="appointmentType === appointmentTypesEnum.Service" />
      </ElFormItem>

      <!--  Doctor  -->
      <ElFormItem
        :label="$t('SelectDoctor')"
        :style="{ order: this.appointmentFieldsFlexOrder.doctor }">
        <UiModelsAutocompleteSearch
          v-model="appointment.doctor_id"
          :modelForUse="Doctor"
          :searchQuery="doctorsSearchQuery"
          :disabled="doctorsIsDisabled"
          :required="appointmentType === appointmentTypesEnum.Doctor" />
      </ElFormItem>

      <!--  Service  -->
      <ElFormItem
        v-show="appointmentType === appointmentTypesEnum.Doctor"
        :label="$t('SelectService')"
        :style="{ order: this.appointmentFieldsFlexOrder.service }">
        <UiModelsAutocompleteSearch
          v-model="appointment.service_id"
          :modelForUse="Service"
          :searchQuery="servicesSearchQuery"
          label="title"
          :disabled="servicesIsDisabled"
          :required="appointmentType === appointmentTypesEnum.Doctor" />
      </ElFormItem>

      <!--  Date  -->
      <ElFormItem
        :label="$t('DateAndTime.SelectDate')"
        :style="{ order: this.appointmentFieldsFlexOrder.date }">
        <ScheduleSlotsSelect
          v-model:start-at="appointment.start_at"
          v-model:end-at="appointment.end_at"
          :disabled="slotsIsDisabled"
          :service-id="appointment.service_id"
          :group-service-id="appointment.group_service_id"
          required />
      </ElFormItem>

      <!--  Actions  -->
      <ElFormItem :style="{ order: this.appointmentFieldsFlexOrder.actions }">
        <div class="create-appointment-drawer-form-actions">
          <ElButton type="primary" native-type="submit" :loading="loading.form">
            {{ $t(`Base.${data ? 'Edit' : 'Create'}`) }}
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="./index.locales.json" />
