<template>
  <LayoutRegistry content-class="v-patients-profile-content" fixHeight>
    <div class="v-patients-profile-content__header v-patients-profile-content-header">
      <div class="v-patients-profile-content-header-info">
        <p class="v-patients-profile-content-header__text">{{ $t('PatientInfo') }}</p>
      </div>
      <div class="v-patients-profile-content-header-actions">
        <ElButton type="primary" @click="editPatient"> {{ $t('Patients.EditPatient') }} </ElButton>
      </div>
    </div>
    <div class="v-patients-profile-content-card" v-if="patient">
      <ElRow>
        <ElCol :span="8">
          <div class="v-patients-profile-content-card_item">
            <ElAvatar :size="108" :src="circleUrl" />
            <div class="v-patients-profile-content-card_info">
              <div>
                <button class="v-patients-profile-content-card_info__button">
                  {{ $t('Base.Patient') }}
                </button>
              </div>
              <div class="v-patients-profile-content-card_info__strong">
                {{ patient.name }}
              </div>
              <div class="v-patients-profile-content-card_info__numbers">
                {{ patient.birthdate }}
              </div>
            </div>
          </div>
        </ElCol>
        <ElCol :span="8">
          <div class="v-patients-profile-content-card_item">
            <div class="v-patients-profile-content-card_info">
              <div class="v-patients-profile-content-card_info__strong">
                {{ $t('User.Phone') }}
              </div>
              <div class="v-patients-profile-content-card_info__numbers">
                {{ patient.phone }}
              </div>
            </div>
          </div>
        </ElCol>
        <ElCol :span="8">
          <div class="v-patients-profile-content-card_item__last">
            <div class="v-patients-profile-content-card_info_actions">
              <div>
                <button class="v-patients-profile-content-card_info_create">
                  <UiIcon :icon="$options.icons.PLUS" /> {{   $t('Appointments.AddRecord') }}
                </button>
              </div>
              <div>
                <button class="v-patients-profile-content-card_info_edit">
                  {{ $t('User.Phone') }}
                </button>
              </div>
              <div>
                <button class="v-patients-profile-content-card_info_delete">
                  {{ $t('User.Phone') }}
                </button>
              </div>
            </div>
          </div>
        </ElCol>
      </ElRow>
    </div>
  </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import { Patient } from '@/models/Patient.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import * as icons from '@/enums/icons.enum.js';
export default {
  name: 'VPatient',
  components: { LayoutRegistry },
  icons: icons,
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
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
<i18n src="./index.locales.json" />
