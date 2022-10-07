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
   * @param {string} payload.payment_type
   * @param {number} payload.invoice_id
   * @param {string|Date} payload.created_at
   */
  constructor(payload) {
    super(payload);

    this.type = payload?.type ?? null;
    this.amount = payload?.amount ?? null;
    this.payment_type = payload?.payment_type ?? Transaction.enum.paymentTypes.Cash;
    this.invoice_id = payload?.invoice_id ?? null;
    this.created_at = payload?.created_at ?? null;
  }

  /**
   * @param {number} invoiceId
   * @return {Promise<{data: response.data, response: {response: AxiosResponse<*>, data: response.data}, transactions: Array<Transaction>}>}
   */
  static async getByInvoiceId(invoiceId) {
    const response = await super.findOneById(invoiceId);

    return {
      response: response,
      data: response.data,
      transactions: response.data.data,
    };
  }

  static enum = {
    types: {
      PayIn: 'pay_in',
      PayOut: 'pay_out',
    },
    paymentTypes: {
      Cash: 'cash',
      Card: 'card',
      Online: 'online',
    },
  };
}
