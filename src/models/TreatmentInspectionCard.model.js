import { InspectionCard } from '@/models/InspectionCard.model';

/**
 * @class TreatmentInspectionCard
 * @extends InspectionCard
 */
export class TreatmentInspectionCard extends InspectionCard {
  /**
   * @typedef {InspectionCardConstructorPayload|object} TreatmentInspectionCardConstructorPayload
   */
  /** @param {TreatmentInspectionCardConstructorPayload|object} [payload] */
  constructor(payload) {
    super({ ...payload, type: InspectionCard.enum.types.Treatment });
  }
}
