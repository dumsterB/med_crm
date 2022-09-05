import { CRUDModel } from '@/models/CRUD.model';

export class User extends CRUDModel {
  static modelName = 'user';
  static tableName = 'users';

  constructor(payload) {
    super(payload);
    this.name = payload?.name ?? null;
    // TODO: убрать
    this.email = payload?.email ?? null;
    this.phone = payload?.phone ?? null;
    this.birthdate = payload?.birthdate ?? null;
    this.gender = payload?.gender ?? User.enum.genders.MAN;
    this.role = payload?.role ?? null;
    this.doctor = payload?.doctor ?? null;
    this.doctor_id = payload?.doctor_id ?? null;

    this.childrens_count = payload?.childrens_count ?? 0;
    this.childrens = payload?.childrens ?? [];
    this.parent_id = payload?.parent_id ?? null;
    this.parent = payload?.parent ?? null;
    this.created_at = payload?.created_at ?? null;
  }

  static enum = {
    genders: {
      MAN: 'man',
      Woman: 'woman',
    },
    roles: {
      SuperAdmin: 'super-admin',
      Admin: 'admin',
      Patient: 'patient',
      Manager: 'manager',
      Doctor: 'doctor',
    },
  };
}
