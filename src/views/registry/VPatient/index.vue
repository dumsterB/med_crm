<template>
  <LayoutRegistry>
    <div v-if="patient">
      Patient {{ patient.name }}

      <ElButton type="primary" @click="editPatient">Edit</ElButton>
    </div>
  </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import { Patient } from '@/models/Patient.model';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';

export default {
  name: 'VPatient',
  components: { LayoutRegistry },
  props: {
    id: [Number, String],
  },
  data() {
    return {
      /**
       * @type Patient
       */
      patient: null,
      loading: false,
    };
  },
  watch: {
    id: {
      handler() {
        this.getUser();
      },
      immediate: true,
    },
  },

  methods: {
    async getUser() {
      this.loading = true;

      const { data } = await Patient.findOneById(this.id);
      this.patient = data.data;

      this.loading = false;
    },

    async editPatient() {
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: { data: this.patient },
      });

      if (action instanceof GlobalDrawerCloseAction) return;
      this.patient = action.data.patient;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
