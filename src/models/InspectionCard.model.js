import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';

/**
 * @class InspectionCard
 * @extends CRUDModel
 */
export class InspectionCard extends CRUDModel {
  static modelName = 'card';
  static tableName = 'cards';

  /**
   * @typedef {object} InspectionCardConstructorPayload
   * @property {string} type
   * @property {string} status
   * @property {number} appointment_id
   * @property {number} user_id
   * @property {User} user
   * @property {Date|string} created_at
   */
  /** @param {InspectionCardConstructorPayload|object} [payload] */
  constructor(payload) {
    super(payload);

    this.type = payload?.type || null;
    this.status = payload?.status || null;
    this.appointment_id = payload?.appointment_id ?? null;
    this.user_id = payload?.user_id ?? null;
    this.user = payload?.user ?? null;
    this.created_at = payload?.created_at ?? null;
  }

  static async draft(id) {
    const response = await ApiService.put(`${this.tableName}/${id}/draft`);
    return { response, data: response.data };
  }

  static async close(id) {
    const response = await ApiService.put(`${this.tableName}/${id}/closed`);
    return { response, data: response.data };
  }

  static enum = {
    types: {
      Default: 'default',
      Treatment: 'treatment',
    },
    statuses: {
      Created: 'created',
      Draft: 'draft',
      Closed: 'closed',
    },
  };
}
