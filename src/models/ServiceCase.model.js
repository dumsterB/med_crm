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
   * @param {string} payload.disease_code_code
   * @param {DiseaseCode} payload.disease_code
   * @param {DiseaseCode} payload.provisional_disease_code
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
    this.diseases_code_code = payload?.disease_code_code ?? null;
    this.disease_code = payload?.disease_code ?? null;
    this.provisional_disease_code = payload?.provisional_disease_code ?? null;
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
