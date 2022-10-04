import { InspectionCardTemplateElement } from '@/models/InspectionCardTemplateElement.model';

/**
 * @class InspectionCardTemplateCategory
 * @extends InspectionCardTemplateElement
 */
export class InspectionCardTemplateCategory extends InspectionCardTemplateElement {
  /**
   * @typedef {InspectionCardTemplateElementConstructorPayload|object} InspectionCardTemplateCategoryConstructorPayload
   */
  /** @param {InspectionCardTemplateCategoryConstructorPayload} payload */
  constructor(payload) {
    super({
      ...(payload || {}),
      type: InspectionCardTemplateElement.enum.types.Category,
    });
  }
}
