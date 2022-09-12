import { InspectionCard } from '@/models/InspectionCard.model';

export class TreatmentInspectionCard extends InspectionCard {
  constructor(payload) {
    super({ ...payload, type: InspectionCard.enum.types.Treatment });

    this.complaints = payload?.complaints ?? null;
    this.general_state = payload?.general_state ?? null;
    this.purpose = payload?.purpose ?? null;
  }
}
