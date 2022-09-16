import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class User
 * @extends CRUDModel
 */
export class User extends CRUDModel {
  static modelName = 'user';
  static tableName = 'users';

  /**
   * @typedef {object} UserConstructorPayload
   * @property {number} id
   * @property {string} name
   * @property {string} email
   * @property {string} phone
   * @property {string} birthdate
   * @property {string} gender from User.enum.genders
   * @property {string} role from User.enum.roles
   * @property {number} doctor_id
   * @property {Doctor} doctor
   * @property {number} childrens_count
   * @property {Array<User|Patient>} childrens
   * @property {number} parent_id
   * @property {User|Patient} parent
   * @property {Date|string} created_at
   */
  /**
   * @param {UserConstructorPayload|object} payload
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
