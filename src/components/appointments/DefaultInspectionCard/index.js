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

export default {
  name: 'DefaultInspectionCard',
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
    };
  },
  computed: {
    ...mapState({
      templates: (state) => state.templates.data,
    }),

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
  },
  watch: {
    'appointment.id': {
      handler() {
        this.inspectionCard = new DefaultInspectionCard(
          this.appointment?.inspection_card || {
            user_id: this.appointment.patient_id,
            appointment_id: this.appointment.id,
          }
        );

        if (!this.appointment.inspection_card_id && this.templates.length) {
          this.templateId = this.templates[0].id;
          this.activeTemplate = this.templates[0];
          this.selectTemplate(this.templates[0]);
        }
      },
      immediate: true,
    },
  },

  methods: {
    submitHandler() {
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
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateTreatmentModal,
        payload: {
          userId: this.appointment.patient_id,
          appointment: this.appointment,
        },
      });

      if (action instanceof GlobalModalCloseAction) return;
    },
  },

  setup: () => ({
    InspectionCardTemplate,
    DiseaseCode,
    icons,
  }),
};
