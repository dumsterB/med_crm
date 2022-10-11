import { DefaultInspectionCard } from '@/models/DefaultInspectionCard.model';

/**
 * @class InspectionCardTemplate
 * @extends DefaultInspectionCard
 */
export class InspectionCardTemplate extends DefaultInspectionCard {
  static modelName = 'template';
  static tableName = 'templates';

  /**
   * @typedef {DefaultInspectionCardConstructorPayload|object} InspectionCardTemplateConstructorPayload
   * @property {string} title
   * @property {number} doctor_id
   * @property {Doctor} doctor
   * @property {Array<InspectionCardCategory|InspectionCardBlock|object>} basic_data
   */
  /** @param {InspectionCardTemplateConstructorPayload|object} [payload] */
  constructor(payload) {
    super(payload);

    this.title = payload?.title ?? '';
    this.doctor_id = payload?.doctor_id ?? null;
    this.doctor = payload?.doctor ?? null;
    this.basic_data = payload?.basic_data ?? [];
  }

  static async getTreatmentTemplate() {
    return await super.find({
      _url: `${this.tableName}/treatment`,
    });
  }
}
