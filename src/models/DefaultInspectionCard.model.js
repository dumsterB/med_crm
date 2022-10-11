import { InspectionCard } from '@/models/InspectionCard.model';

/**
 * @class DefaultInspectionCard
 * @extends InspectionCard
 */
export class DefaultInspectionCard extends InspectionCard {
  /**
   * @typedef {InspectionCardConstructorPayload|object} DefaultInspectionCardConstructorPayload
   */
  /** @param {DefaultInspectionCardConstructorPayload} [payload] */
  constructor(payload) {
    super({ ...payload, type: InspectionCard.enum.types.Default });
  }
}
