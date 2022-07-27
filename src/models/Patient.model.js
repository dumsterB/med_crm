import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class Patient
 * @extends CRUDModel
 */
export class Patient extends CRUDModel {
  static modelName = 'patient';
  static tableName = 'patients';
  constructor(payload) {
    super(payload);
    this.name = payload?.name || null;
    this.email = payload?.email || null;
    this.phone = payload?.phone || null;
    this.birhdate = payload?.birhdate || null;
    this.gender = payload?.gender || null;
    this.role = payload?.role || null;
    this.childrens_count = payload?.childrens_count || 0;
    this.parent_id = payload?.parent_id || null;
    this.created_at = payload?.created_at || null;
  }
}
