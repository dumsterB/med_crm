import { mapState } from 'vuex';
import * as icons from '@/enums/icons.enum.js';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { insertRouteParams } from '@/utils/router.utils';
import { Appointment } from '@/models/Appointment.model';
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model';
import { DefaultInspectionCard } from '@/models/DefaultInspectionCard.model';
import { DiseaseCode } from '@/models/DiseasesCode.model';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

import TemplateResult from '@/components/templates/TemplateResult/index.vue';
import PatientCardRow from '@/components/patients/PatientCardRow/index.vue';
import DiseaseCodeSelect from '@/components/deseaseСode/DiseaseCodeSelect/index.vue';
import TemplateResultBlock from '@/components/templates/TemplateResult/TemplateResultBlock/index.vue';
import CreateTreatmentModal from '@/components/treatments/CreateTreatmentModal/index.vue';
import CreateOrEditAppointmentModal from '@/components/appointments/CreateOrEditAppointmentModal/index.vue';
import { InspectionCard } from '@/models/InspectionCard.model';
import { TreatmentInspectionCard } from '@/models/TreatmentInspectionCard.model';
import { Treatment } from '@/models/Treatment.model';

export default {
  name: 'InspectionCard',
  components: { TemplateResultBlock, DiseaseCodeSelect, PatientCardRow, TemplateResult },
  emits: ['update:appointment', 'appointment:provide'],
  props: {
    appointment: [Appointment, Object],
    readonly: Boolean,
  },
  data() {
    return {
      templateId: null,
      activeTemplate: null,
      inspectionCard: null,
      loading: {
        provide: false,
        closeTreatment: false,
      },
    };
  },
  computed: {
    ...mapState({
      templates: (state) => state.templates.data,
      treatmentTemplate: (state) => state.templates.treatmentTemplate,
    }),

    isTreatment() {
      return (
        this.appointment.inspectionCard?.type === InspectionCard.enum.types.Treatment ||
        !!this.appointment.treatment_id
      );
    },

    patientAmbulatoryCardPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.childrenMap.PATIENT_ROUTE_AMBULATORY_CARD._fullPath,
        params: {
          id: this.appointment.patient_id,
        },
      });
    },
    patientCardItems() {
      let servicesText = this.appointment.services.map((service) => service.title).join(',\n');

      return [
        {
          label: this.$t('Base.Services'),
          value: servicesText,
        },
        {
          label: this.$t('Appointments.StartDate'),
          value: this.appointment.start_at,
        },
      ];
    },

    actionsOptions() {
      return {
        setTreatment: {
          isShow: !this.readonly && !this.isTreatment,
        },
        closeTreatment: {
          isShow:
            !this.readonly &&
            this.appointment.treatment_id &&
            this.appointment.treatment.status === Treatment.enum.statuses.Created,
        },
      };
    },
  },
  watch: {
    'appointment.id': {
      handler() {
        const currentClass = this.isTreatment ? TreatmentInspectionCard : DefaultInspectionCard;

        this.inspectionCard = new currentClass(
          this.appointment?.inspection_card || {
            user_id: this.appointment.patient_id,
            appointment_id: this.appointment.id,
          }
        );

        this.selectDefaultTemplateIfNeeded();
      },
      immediate: true,
    },
  },

  methods: {
    submitHandler() {
      this.loading.provide = true;
      this.$emit('appointment:provide');
    },

    print() {
      window.print();
    },

    /** @param {InspectionCardTemplate} template */
    selectTemplate(template) {
      this.inspectionCard = new DefaultInspectionCard({
        id: null,
        user_id: this.appointment.patient_id,
        appointment_id: this.appointment.id,

        basic_data: template.basic_data,
      });
      this.updateInspectionCard();
    },

    selectDefaultTemplateIfNeeded() {
      if (this.isTreatment && !this.appointment.inspection_card_id) {
        this.selectTemplate(this.treatmentTemplate);
      }
      if (!this.isTreatment && !this.appointment.inspection_card_id && this.templates.length) {
        this.templateId = this.templates[0].id;
        this.activeTemplate = this.templates[0];
        this.selectTemplate(this.templates[0]);
      }
    },

    async updateInspectionCard() {
      try {
        const { data } = this.appointment.inspection_card_id
          ? await DefaultInspectionCard.update({
              id: this.appointment.inspection_card_id,
              payload: this.inspectionCard,
            })
          : await DefaultInspectionCard.create(this.inspectionCard);

        this.$emit('update:appointment', {
          ...this.appointment,
          inspection_card_id: data.data.id,
          inspection_card: data.data,
        });
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }
    },

    async setTreatment() {
      this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateTreatmentModal,
        payload: {
          userId: this.appointment.patient_id,
          appointment: this.appointment,
        },
      });
    },
    async closeTreatment() {
      if (this.loading.closeTreatment) return;
      this.loading.closeTreatment = true;

      try {
        const { data } = await Treatment.close(this.appointment.treatment_id);
        this.$emit('update:appointment', {
          ...this.appointment,
          treatment: data.data,
        });
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.closeTreatment = false;
    },

    async setControlAppointment() {
      this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateOrEditAppointmentModal,
        payload: {
          disableDefaultAction: true,
          patient: this.appointment.patient,
        },
      });
    },
    async setExamination() {
      this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateOrEditAppointmentModal,
        payload: {
          disableDefaultAction: true,
          patient: this.appointment.patient,
          setDefaultMyDoctor: false,
        },
      });
    },
  },

  setup: () => ({
    InspectionCardTemplate,
    DiseaseCode,
    icons,
  }),
};
