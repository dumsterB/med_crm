import { InspectionCardElement } from '@/models/InspectionCardElement.model';

/**
 * @class InspectionCardCategory
 * @extends InspectionCardElement
 */
export class InspectionCardCategory extends InspectionCardElement {
  /**
   * @typedef {InspectionCardElementConstructorPayload|object} InspectionCardCategoryConstructorPayload
   */
  /** @param {InspectionCardCategoryConstructorPayload} payload */
  constructor(payload) {
    super({
      ...(payload || {}),
      type: InspectionCardElement.enum.types.Category,
    });
  }
}
