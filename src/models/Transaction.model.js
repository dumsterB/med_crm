import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class Transaction
 * @extends CRUDModel
 */
export class Transaction extends CRUDModel {
  static modelName = 'transaction';
  static tableName = 'transactions';

  /**
   * @param {object} [payload]
   * @param {number} payload.id
   * @param {string} payload.type
   * @param {number} payload.amount
   * @param {number} payload.invoice_id
   * @param {string|Date} payload.created_at
   */
  constructor(payload) {
    super(payload);

    this.type = payload?.type ?? null;
    this.amount = payload?.amount ?? null;
    this.invoice_id = payload?.invoice_id ?? null;
    this.created_at = payload?.created_at ?? null;
  }

  static enum = {
    types: {
      PayIn: 'pay_in',
      PayOut: 'pay_out',
    },
  };
}
