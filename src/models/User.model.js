import { CRUDModel } from '@/models/CRUD.model';

export class User extends CRUDModel {
  static modelName = 'user';
  static tableName = 'users';

  /**
   * @param {object} [payload]
   * @param {number} payload.id
   * @param {string} payload.name
   * @param {string} payload.email
   * @param {string} payload.phone
   * @param {string} payload.birthdate
   * @param {string} payload.gender from User.enum.genders
   * @param {string} payload.role from User.enum.roles
   * @param {number} payload.doctor_id
   * @param {Doctor} payload.doctor
   * @param {number} payload.childrens_count
   * @param {Array<User|Patient>} payload.childrens
   * @param {number} payload.parent_id
   * @param {User|Patient} payload.parent
   */
  constructor(payload) {
    super(payload);

    this.name = payload?.name ?? null;
    this.email = payload?.email ?? null;
    this.phone = payload?.phone ?? null;
    this.birthdate = payload?.birthdate ?? null;
    this.gender = payload?.gender ?? User.enum.genders.MAN;
    this.role = payload?.role ?? null;
    this.doctor_id = payload?.doctor_id ?? null;
    this.doctor = payload?.doctor ?? null;

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
