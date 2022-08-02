import { User } from '@/models/User.model';

/**
 * @class Patient
 * @extends CRUDModel
 */
export class Patient extends User {
  static modelName = 'patient';
  static tableName = 'patients';

  /**
   * @param {object} [payload]
   * @param {number} payload.id
   * @param {number} payload.childrens_count
   * @param {Array<User|Patient>} payload.childrens
   * @param {number} payload.parent_id
   * @param {User|Patient} payload.parent
   */
  constructor(payload) {
    super(payload);
    this.role = User.enum.roles.Patient;
    this.childrens_count = payload?.childrens_count ?? 0;
    this.childrens = payload?.childrens ?? [];
    this.parent_id = payload?.parent_id ?? null;
    this.parent = payload?.parent ?? null;
  }
}
