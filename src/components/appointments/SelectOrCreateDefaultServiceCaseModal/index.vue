<template>
  <ElDialog
    :title="$t('Title')"
    width="500px"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)">
    <div v-show="!createState" class="select-or-create-service-case-modal__part">
      <ElButton
        v-for="serviceCase in serviceCases"
        :key="serviceCase.id"
        plain
        :loading="loading.select && selectedServiceCaseId === serviceCase.id"
        @click="selectServiceCase(serviceCase)">
        {{ serviceCase.title }}
      </ElButton>

      <ElButton type="primary" :loading="loading.get" @click="createState = true">
        <template #icon> <UiIcon :icon="icons.PLUS" /> </template>
        {{ $t('Base.CreateNew') }}
      </ElButton>
    </div>

    <form
      v-show="createState"
      class="select-or-create-service-case-modal__part"
      @submit.prevent="createServiceCase">
      <ElInput v-model="title" :placeholder="$t('Base.PleaseInput')" :required="createState" />

      <ElButton type="primary" native-type="submit" :loading="loading.create || loading.select">
        <template #icon>
          <UiIcon :icon="icons.PLUS" />
        </template>
        {{ $t('Base.Create') }}
      </ElButton>
    </form>
  </ElDialog>
</template>

<script>
import { ServiceCase } from '@/models/ServiceCase.model';
import * as icons from '@/enums/icons.enum.js';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import { Appointment } from '@/models/Appointment.model';

export default {
  name: 'SelectOrCreateDefaultServiceCaseModal',
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    userId: [Number, String],
    appointmentId: [Number, String],
  },
  data() {
    return {
      /** @type {Array<ServiceCase>} */
      serviceCases: [],
      loading: {
        get: false,
        create: false,
        select: false,
      },
      selectedServiceCaseId: null,

      createState: false,
      title: '',
    };
  },

  watch: {
    userId: {
      handler(val) {
        if (val) this.getServiceCases(val);
      },
      immediate: true,
    },
  },

  methods: {
    async getServiceCases(userId) {
      this.loading.get = true;

      const { data } = await ServiceCase.findByUserId(userId, {
        status: ServiceCase.enum.statuses.Created,
        per_page: 10,
      });
      this.serviceCases = data.data;

      if (!data.meta.total) this.createState = true;
      this.loading.get = false;
    },

    async createServiceCase() {
      if (this.loading.create) return;
      this.loading.create = true;

      try {
        const { data } = await ServiceCase.create({
          title: this.title,
          user_id: this.userId,
          complaint: 'test', // TODO: убрать
        });
        await this.selectServiceCase(data.data);
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.create = false;
    },

    /** @param {ServiceCase|Object} serviceCase */
    async selectServiceCase(serviceCase) {
      if (this.loading.select) return;
      this.loading.select = true;
      this.selectedServiceCaseId = serviceCase.id;

      try {
        const { data } = await Appointment.attachServiceCase({
          serviceCaseId: serviceCase.id,
          appointmentId: this.appointmentId,
        });

        this.$emit(
          'action',
          new GlobalModalAction({
            name: 'selected',
            data: {
              appointment: data.data,
              serviceCase: serviceCase,
            },
          })
        );
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.select = false;
      this.selectedServiceCaseId = null;
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
<i18n src="./index.locales.json" />
