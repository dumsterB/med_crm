import { CRUDModel } from '@/models/CRUD.model';

/**
 * Случай обслуживания для Appointment
 *
 * @class ServiceCase
 * @extends CRUDModel
 */
export class ServiceCase extends CRUDModel {
  static modelName = 'case';
  static tableName = 'cases';

  /**
   * @param {object} payload
   * @param {number} payload.id
   * @param {string} payload.title
   * @param {string} payload.complaint
   * @param {Array<string>>} payload.disease_code_codes
   * @param {Array<DiseaseCode>} payload.disease_codes
   * @param {string} payload.status
   * @param {number} payload.user_id
   * @param {User|Patient} payload.user
   * @param {string} payload.opened_at
   * @param {string} payload.closed_at
   * @param {string} payload.created_at
   */
  constructor(payload) {
    super(payload);

    this.title = payload?.title ?? '';
    this.complaint = payload?.complaint ?? null;
    this.disease_code_codes = payload?.disease_code_codes ?? [];
    this.disease_codes = payload?.disease_codes ?? [];
    this.status = payload?.status ?? null;
    this.user_id = payload?.user_id ?? null;
    this.user = payload?.user ?? null;

    this.opened_at = payload?.opened_at ?? null;
    this.closed_at = payload?.closed_at ?? null;
    this.created_at = payload?.created_at ?? null;
  }

  static async findByUserId(userId, query) {
    return this.find({
      _url: `${this.tableName}/${userId}`,
      ...query,
    });
  }

  static enum = {
    statuses: {
      Created: 'created',
      Closed: 'closed',
    },
  };
}
