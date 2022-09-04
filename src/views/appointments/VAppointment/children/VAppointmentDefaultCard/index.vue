<template>
  <ElCard class="appointment-card" shadow="never" v-bind="$attrs">
    <template #header>
      <router-link class="appointment-card__header appointment-card-header" :to="patientPageLink">
        <UiAvatar class="appointment-card-header__avatar" size="super-large" />

        <div class="appointment-card-header__user appointment-card-header-user">
          <div class="appointment-card-header-user__name">{{ appointment.patient?.name }}</div>
          <div class="appointment-card-header-user__phone">{{ appointment.patient?.phone }}</div>
        </div>

        <AppointmentStatusTag
          class="appointment-card-header__status"
          :status="appointment.status" />
      </router-link>
    </template>

    <div class="appointment-card-body">
      <div
        v-for="item in infoItems"
        :key="item.value"
        class="appointment-card-body__item appointment-card-body-item">
        <div class="appointment-card-body-item__title">{{ item.label }}:</div>
        <div class="appointment-card-body-item__value">{{ item.value }}</div>
      </div>
    </div>

    <ElDivider />

    <div class="appointment-card-actions">
      <ElButton
        v-if="appointment.status === Appointment.enum.statuses.Approved"
        type="primary"
        :loading="loading[Appointment.enum.statuses.Waiting]"
        @click="updateStatus(Appointment.enum.statuses.Waiting)">
        {{ $t('Base.CallToReception') }}
      </ElButton>
      <ElButton
        v-if="appointment.status === Appointment.enum.statuses.Approved"
        type="danger"
        plain
        :loading="loading[Appointment.enum.statuses.Canceled]"
        @click="updateStatus(Appointment.enum.statuses.Canceled)">
        {{ $t('Appointments.CancelReception') }}
      </ElButton>

      <ElButton
        v-if="appointment.status === Appointment.enum.statuses.Waiting"
        type="primary"
        :loading="loading[Appointment.enum.statuses.InProgress]"
        @click="updateStatus(Appointment.enum.statuses.InProgress)">
        {{ $t('Appointments.PatientCome') }}
      </ElButton>
      <ElButton
        v-if="appointment.status === Appointment.enum.statuses.Waiting"
        type="danger"
        plain
        :loading="loading[Appointment.enum.statuses.Canceled]"
        @click="updateStatus(Appointment.enum.statuses.Canceled)">
        {{ $t('Appointments.PatientNotCome') }}
      </ElButton>

      <ElButton
        v-if="appointment.status === Appointment.enum.statuses.InProgress"
        type="primary"
        :loading="loading[Appointment.enum.statuses.Provided]"
        @click="updateStatus(Appointment.enum.statuses.Provided)">
        {{ $t('Appointments.EndReception') }}
      </ElButton>

      <ElButton
        v-if="
          user.role === User.enum.roles.Manager &&
          appointment.status === Appointment.enum.statuses.Approved
        "
        type="primary"
        plain
        @click="editAppointment">
        {{ $t('Appointments.EditReception') }}
      </ElButton>
    </div>
  </ElCard>
</template>

<script src="./index.js" />

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
