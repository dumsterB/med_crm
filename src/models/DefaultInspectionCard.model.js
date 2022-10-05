import { InspectionCard } from '@/models/InspectionCard.model';

/**
 * @class DefaultInspectionCard
 * @extends InspectionCard
 */
export class DefaultInspectionCard extends InspectionCard {
  /**
   * @typedef {InspectionCardConstructorPayload|object} DefaultInspectionCardConstructorPayload
   * @property {Array<InspectionCardCategory|InspectionCardBlock|object>} basic_data
   */
  /** @param {DefaultInspectionCardConstructorPayload} [payload] */
  constructor(payload) {
    super({ ...payload, type: InspectionCard.enum.types.Default });

    this.basic_data = payload?.basic_data ?? [];
  }
}
