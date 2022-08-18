<template>
  <LayoutDoctors>
    <div class="v-doctors-queue-content__header v-doctors-queue-content-header">
      <div class="v-doctors-queue-content-header__actions">
        <ElButton type="primary" @click="createAppointment">
          <UiIcon class="v-doctors-queue-content-header__icon" :icon="$options.icons.BACK_ARROW" />
          {{ $t('Base.Back') }}
        </ElButton>
        <div class="v-doctors-queue-content-header__name">
          <p>Сардорбек Максудов</p>
          {{user}}
        </div>

        <!--        <ElSelect
          v-model="value"
          :placeholder="$t('Appointments.SelectDoctor')"
          size="large">
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </ElSelect>

        <ElSelect
          v-model="value"
          :placeholder="$t('Appointments.SelectStatus')"
          size="large">
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </ElSelect>-->
      </div>
    </div>
    <QueueTable> </QueueTable>
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
      if(this.user){
        const { data } = await Appointment.findByDoctor({ doctorId: this.user });
        console.log(data)
      }
      this.loading = false;
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user.id,
    }),
  },
};
</script>

<style scoped></style>
<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
