import { CRUDModel } from '@/models/CRUD.model';

export class User extends CRUDModel {
  static modelName = 'user';
  static tableName = 'users';
  constructor(payload) {
    super(payload);
    this.name = payload?.name ?? null;
    this.email = payload?.email ?? null;
    this.phone = payload?.phone ?? null;
    this.birhdate = payload?.birhdate ?? null;
    this.gender = payload?.gender ?? null;
    this.role = payload?.role ?? null;
    this.created_at = payload?.created_at ?? null;
  }
}
