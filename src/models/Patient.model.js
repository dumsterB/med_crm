import { User } from '@/models/User.model';

/**
 * @class Patient
 * @extends CRUDModel
 */
export class Patient extends User {
  static modelName = 'patient';
  static tableName = 'patients';
  constructor(payload) {
    super(payload);
    this.childrens_count = payload?.childrens_count ?? 0;
    this.parent_id = payload?.parent_id ?? null;
  }
}
