<template>
  <ElDialog
    custom-class="create-or-edit-template-drawer"
    :title="data?.id ? $t('Templates.Edit') : $t('Templates.Create')"
    size="50%"
    @update:model-value="$emit('update:modelValue', $event)">
    <ElForm
      @submit.prevent="submitHandler"
      class="create-template-drawer-form"
      label-position="top">
      <ElFormItem :label="$t('Templates.Name')">
        <ElInput v-model="template.title" :placeholder="$t('Base.WriteText')" required />
      </ElFormItem>

      <DefaultInspectionCardBaseFormItems v-model:data="template" />

      <ElFormItem>
        <div class="create-appointment-drawer-form-actions">
          <ElButton type="primary" native-type="submit" :loading="loading">
            {{ data?.id ? $t('Base.Edit') : $t('Base.Create') }}
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>

<script>
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model';
import { mapState } from 'vuex';
import {GlobalModalAction} from "@/models/client/ModalAndDrawer/GlobalModalAction";

import DefaultInspectionCardBaseFormItems from '@/components/appointments/DefaultInspectionCardBaseFormItems/index.vue';

export default {
  name: 'CreateOrEditTemplateModal',
  components: { DefaultInspectionCardBaseFormItems },
  emits: ['update:modelValue', 'action'],
  props: {
    data: [InspectionCardTemplate, Object],
  },
  data() {
    return {
      template: null,
      loading: false,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  watch: {
    modelValue: {
      handler() {
        this.template = new InspectionCardTemplate(this.data || {});
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async submitHandler() {
      this.loading = true;

      try {
        this.data?.id ? await this.editTemplate() : await this.createTemplate();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading = false;
    },

    async createTemplate() {
      const { data } = await InspectionCardTemplate.create({
        ...this.template,
      });
      this.$store.dispatch('templates/createItem', data.data);
      this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessCreated') });

      this.$emit(
        'action',
        new GlobalModalAction({
          name: 'created',
          data: { template: data.data },
        })
      );
    },

    async editTemplate() {
      const { data } = await InspectionCardTemplate.update(this.template, this.data.id);
      this.$store.dispatch('templates/editItem', data.data);
      this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessUpdated') });

      this.$emit(
        'action',
        new GlobalModalAction({
          name: 'created',
          data: { template: data },
        })
      );
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="@/locales/templates.locales.json" />
