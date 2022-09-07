import { InspectionCard } from '@/models/InspectionCard.model';

export class DefaultInspectionCard extends InspectionCard {
  constructor(payload) {
    super({ ...payload, type: InspectionCard.enum.types.Default });

    this.complaints = payload?.complaints ?? null;
    this.anamnesis = payload?.anamnesis ?? null;
    this.anamnesis_life = payload?.anamnesis_life ?? null;
    this.operations = payload?.operations ?? null;
    this.general_state = payload?.general_state ?? null;
    this.local_status = payload?.local_status ?? null;
    this.preliminary_diagnosis = payload?.preliminary_diagnosis ?? null;
    this.survey_plan = payload?.survey_plan ?? null;
    this.recommendations = payload?.recommendations ?? null;
  }
}
