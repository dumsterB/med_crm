<template>
  <LayoutRegistry> Patient {{ patient.name }} </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import { Patient } from '@/models/Patient.model';

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
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
