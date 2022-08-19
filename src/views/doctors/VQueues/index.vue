<template>
  <LayoutDoctors>
    <div class="v-doctors-queue-content__header v-doctors-queue-content-header">
      <div class="v-doctors-queue-content-header__actions">
        <ElButton type="primary">
          <UiIcon class="v-doctors-queue-content-header__icon" :icon="$options.icons.BACK_ARROW" />
          {{ $t('Base.Back') }}
        </ElButton>
      </div>
    </div>
    <QueueTable class="v-doctors-queue-content__table" :items="queues" :loading="loading">
    </QueueTable>
  </LayoutDoctors>
</template>
<script>
import LayoutDoctors from '@/components/layouts/layoutDoctor/index.vue';
import QueueTable from '@/components/patients/QueueTable/index.vue';
import * as icons from '@/enums/icons.enum.js';
import { Appointment } from '@/models/Appointment.model';
import { mapState } from 'vuex';

export default {
  name: 'DoctorsQueue',
  icons: icons,
  props: {
    id: [Number, String],
  },
  components: {
    LayoutDoctors,
    QueueTable,
  },
  data() {
    return {
      queues: null,
      loading: false,
    };
  },
  watch: {
    id: {
      handler() {
        this.getQueus();
      },
      immediate: true,
    },
  },
  methods: {
    async getQueus() {
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
