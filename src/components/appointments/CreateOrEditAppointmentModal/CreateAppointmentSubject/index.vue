<template>
  <ElForm class="create-appointment-subject" @submit.prevent="createSubject">
    <div class="create-appointment-subject__part create-appointment-subject-part">
      <!--  Doctor  -->
      <UiModelsAutocompleteSearch
        class="create-appointment-subject__doctor"
        v-model="subject.doctor_id"
        :modelForUse="Doctor"
        :defaultItem="user?.doctor"
        :placeholder="$t('Appointments.SelectDoctor')"
        clearable
        @select="subject.doctor = $event" />

      <!--  GroupService  -->
      <UiModelsAutocompleteSearch
        class="create-appointment-subject__services"
        v-model="subject.group_service_ids"
        label="title"
        :placeholder="$t('Appointments.SelectServices')"
        :modelForUse="ServiceGroup"
        :searchQuery="options.groupServices.searchQuery"
        required
        multiple
        collapse-tags
        collapse-tags-tooltip
        @select="subject.group_services = $event">
        <template #default="{ item }"> {{ generateLabel(item) }} </template>
      </UiModelsAutocompleteSearch>
    </div>

    <div class="create-appointment-subject__part create-appointment-subject-part">
      <!--  Select Date type  -->
      <ElRadioGroup class="create-appointment-subject__date-type" v-model="isLiveQueue">
        <ElRadio :label="true"> {{ $t('Appointments.LiveQueue') }} </ElRadio>
        <ElRadio :label="false"> {{ $t('Appointments.RecordOnTime') }} </ElRadio>
      </ElRadioGroup>

      <!--  Date  -->
      <ScheduleSlotsSelect
        v-show="!isLiveQueue"
        :label="$t('DateAndTime.SelectDate')"
        v-model:start-at="subject.start_at"
        v-model:end-at="subject.end_at"
        :search-query="options.slots.searchQuery"
        :dependencies="options.slots.dependencies"
        :disabled="!subject.group_service_ids.length" />

      <ElButton class="create-appointment-subject__submit" type="primary" native-type="submit">
        {{ $t('Base.Add') }}
      </ElButton>
    </div>
  </ElForm>
</template>

<script>
import { mapState } from 'vuex';
import { cloneDeep } from 'lodash';
import { Appointment } from '@/models/Appointment.model';
import { AppointmentSubject } from '@/models/AppointmentSubject.model';
import { ServiceGroup } from '@/models/ServiceGroup.model';
import { Doctor } from '@/models/Doctor.model';

import ScheduleSlotsSelect from '@/components/appointments/ScheduleSlotsSelect/index.vue';
import { formatPrice } from '@/utils/price.util';

export default {
  name: 'CreateAppointmentSubject',
  emits: ['subject:create'],
  components: { ScheduleSlotsSelect },
  props: {
    appointment: [Appointment, Object],
    setDefaultMyDoctor: Boolean,
  },
  data() {
    return {
      subject: new AppointmentSubject(),
      isLiveQueue: true,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    options() {
      return {
        groupServices: {
          searchQuery: {
            query_field: null,
            query_type: null,
            query_operator: null,
            some_services: true,
            doctor_id: this.subject.doctor_id,
          },
        },

        slots: {
          dependencies: [this.subject.group_service_ids, this.subject.doctor_id],
          searchQuery: {
            group_service_ids: this.subject.group_service_ids,
            doctor_id: this.subject.doctor_id,
          },
        },
      };
    },
  },

  watch: {
    'user.doctor_id': {
      handler(value) {
        if (this.setDefaultMyDoctor) {
          this.subject = new AppointmentSubject({
            ...this.subject,

            doctor_id: value,
            doctor: this.user.doctor,
          });
        }
      },
      immediate: true,
    },
    'subject.doctor_id': {
      handler() {
        this.subject.group_service_ids = [];
      },
    },
  },

  methods: {
    createSubject() {
      this.$emit('subject:create', cloneDeep(this.subject));
      this.reset();
    },

    reset() {
      this.subject = new AppointmentSubject({
        doctor_id: this.setDefaultMyDoctor ? this.user.doctor_id : null,
        doctor: this.setDefaultMyDoctor ? this.user.doctor : null,
      });
      this.isLiveQueue = true;
    },

    /** @param {ServiceGroup} item */
    generateLabel(item) {
      return `${item.title} - ${formatPrice({ price: item.price })} ${this.$t('Base.Sum')}`;
    },
  },

  setup: () => ({
    ServiceGroup,
    Doctor,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
