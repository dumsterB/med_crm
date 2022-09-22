import { ApiService } from '@/services/api.service';
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
   */
  /** @param {InspectionCardTemplateConstructorPayload|object} [payload] */
  constructor(payload) {
    super(payload);

    this.title = payload?.title ?? '';
    this.doctor_id = payload?.doctor_id ?? null;
    this.doctor = payload?.doctor ?? null;
  }

  static async create(payload) {
    return super.create(payload, {
      url: `${this.tableName}/create`,
    });
  }

  static async update(data, id) {
    const response = await ApiService.put(`${this.tableName}/${id}/update`, {
      ...data,
    });
    return {
      response: response,
      data: response.data,
    };
  }

  static async delete(id) {
    const response = await ApiService.delete(`${this.tableName}/${id}/delete`);
    return {
      response: response,
      data: response.data,
    };
  }
}
