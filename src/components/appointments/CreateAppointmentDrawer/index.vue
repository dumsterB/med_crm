<template>
  <ElDrawer
    custom-class="create-appointment-drawer"
    :model-value="modelValue"
    :title="$t('Title')"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm
      class="create-appointment-drawer-form"
      label-position="top"
      @submit.prevent="createAppointment">
      <!--  Patient  -->
      <ElFormItem label="patient" :style="{ order: this.appointmentFieldsFlexOrder.patient }">
        <UiModelsAutocompleteSearch
          v-model="appointment.patient_id"
          :modelForUse="Patient"
          :defaultItem="patient"
          :disabled="!!patient"
          required />
      </ElFormItem>

      <!--  Type  -->
      <ElFormItem label="select type" :style="{ order: this.appointmentFieldsFlexOrder.type }">
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
      <ElFormItem label="speciality" :style="{ order: this.appointmentFieldsFlexOrder.specialty }">
        <SpecialtiesSelect v-model="appointment.specialty_id" />
      </ElFormItem>

      <!--  Doctor  -->
      <ElFormItem label="doctor" :style="{ order: this.appointmentFieldsFlexOrder.doctor }">
        <UiModelsAutocompleteSearch
          v-model="appointment.doctor_id"
          :modelForUse="Doctor"
          :searchQuery="doctorsSearchQuery"
          :disabled="doctorsIsDisabled"
          required />
      </ElFormItem>

      <!--  Service  -->
      <ElFormItem label="service" :style="{ order: this.appointmentFieldsFlexOrder.service }">
        <UiModelsAutocompleteSearch
          v-model="appointment.service_id"
          :modelForUse="Service"
          :searchQuery="servicesSearchQuery"
          label="title"
          :disabled="servicesIsDisabled"
          required />
      </ElFormItem>

      <!--  Date  -->
      <ElFormItem label="date" :style="{ order: this.appointmentFieldsFlexOrder.date }">
        <ScheduleSlotsSelect :disabled="slotsIsDisabled" :service-id="appointment.service_id" />
      </ElFormItem>

      <!--  Actions  -->
      <ElFormItem :style="{ order: this.appointmentFieldsFlexOrder.actions }">
        <div class="create-appointment-drawer-form-actions">
          <ElButton text> Cancel </ElButton>
          <ElButton type="primary" native-type="submit"> Create </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
