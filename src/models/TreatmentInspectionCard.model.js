import { InspectionCard } from '@/models/InspectionCard.model';

/**
 * @class TreatmentInspectionCard
 * @extends InspectionCard
 */
export class TreatmentInspectionCard extends InspectionCard {
  /**
   * @typedef {InspectionCardConstructorPayload|object} TreatmentInspectionCardConstructorPayload
   * @property {string} complaints
   * @property {string} general_state
   * @property {string} purpose
   */
  /** @param {TreatmentInspectionCardConstructorPayload|object} [payload] */
  constructor(payload) {
    super({ ...payload, type: InspectionCard.enum.types.Treatment });

    this.complaints = payload?.complaints ?? null;
    this.general_state = payload?.general_state ?? null;
    this.purpose = payload?.purpose ?? null;
  }
}
