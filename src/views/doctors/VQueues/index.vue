<template>
  <LayoutDoctors fixHeight>
    <QueueTable class="v-doctors-queue-content__table" :items="queues" :loading="loading" />
  </LayoutDoctors>
</template>

<script>
import { mapState } from 'vuex';
import LayoutDoctors from '@/components/layouts/LayoutDoctor/index.vue';
import QueueTable from '@/components/patients/QueueTable/index.vue';
import * as icons from '@/enums/icons.enum.js';
import { Appointment } from '@/models/Appointment.model';

export default {
  name: 'VQueues',
  icons: icons,
  components: { LayoutDoctors, QueueTable },
  props: {
    id: [Number, String],
  },
  data() {
    return {
      queues: [],
      loading: false,
    };
  },
  watch: {
    id: {
      handler() {
        this.getQueues();
      },
      immediate: true,
    },
  },
  methods: {
    async getQueues() {
      this.loading = true;

      const { data } = await Appointment.findByDoctor({ doctorId: this.user.doctor_id });
      this.queues = data.data;

      this.loading = false;
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style scoped></style>
<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
