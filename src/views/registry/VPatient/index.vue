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
                  <UiIcon :icon="$options.icons.PLUS" /> {{ $t('Appointments.AddRecord') }}
                </button>
              </div>
              <div>
                <button class="v-patients-profile-content-card_info_edit">
                  {{ $t('Base.Edit') }}
                </button>
              </div>
              <div>
                <button class="v-patients-profile-content-card_info_delete">
                  {{ $t('Base.Delete') }}
                </button>
              </div>
            </div>
          </div>
        </ElCol>
      </ElRow>
    </div>
    <p
      class="v-patients-profile-content-description__title"
      v-if="patient && patient.childrens.length > 0">
      {{ $t('Children') }}
    </p>
    <div
      class="v-patients-profile-content-card"
      v-for="child of patient.childrens"
      :key="child.id"
      v-if="patient">
      <ElRow>
        <ElCol :span="8">
          <div class="v-patients-profile-content-card_item">
            <ElAvatar :size="108" :src="child.src" />
            <div class="v-patients-profile-content-card_info">
              <div>
                <button class="v-patients-profile-content-card_info__button">
                  {{ $t('ChildrenText') }}
                </button>
              </div>
              <div class="v-patients-profile-content-card_info__strong">
                {{ child.name }}
              </div>
              <div class="v-patients-profile-content-card_info__numbers">
                {{ child.birthdate }}
              </div>
            </div>
          </div>
        </ElCol>
        <ElCol :span="8">
          <div class="v-patients-profile-content-card_item">
            <div class="v-patients-profile-content-card_info">
              <div class="v-patients-profile-content-card_info__strong">
                {{ $t('Parents') }}
              </div>
              <div class="v-patients-profile-content-card_info__numbers">
                {{ patient.name }}
                <UiIcon
                  class="v-patients-profile-content-card_info__icon"
                  :icon="$options.icons.TRASH" />
              </div>
              <br />
              <div class="v-patients-profile-content-card_info__strong">
                {{ $t('Gender') }}
              </div>
              <div class="v-patients-profile-content-card_info__numbers">
                {{ child.gender }}
              </div>
            </div>
          </div>
        </ElCol>
        <ElCol :span="8">
          <div class="v-patients-profile-content-card_item__last">
            <div class="v-patients-profile-content-card_info_actions">
              <div>
                <button class="v-patients-profile-content-card_info_create">
                  <UiIcon :icon="$options.icons.PLUS" /> {{ $t('Appointments.AddRecord') }}
                </button>
              </div>
              <div>
                <button class="v-patients-profile-content-card_info_edit">
                  {{ $t('Base.Edit') }}
                </button>
              </div>
              <div>
                <button class="v-patients-profile-content-card_info_delete">
                  {{ $t('Base.Delete') }}
                </button>
              </div>
            </div>
          </div>
        </ElCol>
      </ElRow>
    </div>
    <p class="v-patients-profile-content-description__title">
      {{ $t('Appointments') }}
    </p>
    <div class="v-patients-profile-appointments-content">
     <ElRow gutter="20">
       <ElCol v-for="appointment of appointments" :key="appointment.id" class="grid-content v-patients-profile-appointments-content__col"  :span="8">
        <div class="v-patients-profile-appointments-content_card">
           <div class="v-patients-profile-appointments-content_profile">
             <ElAvatar :size="108" :src="appointment.doctor.avatar.link" />
             <div class="v-patients-profile-appointments-content_profile_info">
                <button class="v-patients-profile-appointments-content_profile__danger-button">{{ $t('Appointment') }}</button>
                <p class="v-patients-profile-appointments-content_profile__title">{{appointment.doctor.name}}</p>
               <p v-for="specialties of appointment.doctor.specialties" :key="specialties">
                 {{specialties.title}}
               </p>
             </div>
           </div>
          <hr class="v-patients-profile-appointments-content_card__divider">
        </div>
       </ElCol>
     </ElRow>
    </div>
  </LayoutRegistry>
</template>

<script>
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import { Patient } from '@/models/Patient.model';
import { Appointment } from '@/models/Appointment.model';
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
      appointments: null,
      patient: null,
      loading: false,
    };
  },
  watch: {
    id: {
    async  handler() {
      await  this.getUser();
        this.getAppointments();
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

    async getAppointments() {
      this.loading = true;

      if (this.patient) {
        const { data } = await Appointment.find({
          user_id: this.patient.id,
          query_type: 'EQUALS',
          search: this.patient.id,
          page: 1,
          per_page: 100,
        });
        this.appointments = data.data;
      }

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
