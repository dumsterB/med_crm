import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class Invoice
 * @extends CRUDModel
 */
export class Invoice extends CRUDModel {
  static modelName = 'invoice';
  static tableName = 'invoices';

  /**
   * @param {object} [payload]
   * @param {string} payload.status
   * @param {number} payload.discount
   * @param {number} payload.user_id
   * @param {User} payload.user
   * @param {number} payload.clinic_id
   * @param {Clinic} payload.clinic
   * @param {number} payload.appointment_id
   * @param {Appointment} payload.appointment
   *
   * @param {Array<object>} payload.subjects  {group_service_id: number}, {service_id: number}
   * @param {Array<InvoicePaymentSubject>} payload.payment_subjects
   * @param {Array<number>} payload.transactions_ids
   * @param {Array<Transaction>} payload.transactions
   *
   * @param {string} payload.description
   * @param {number} payload.total_amount
   * @param {number} payload.discounted_amount
   * @param {number} payload.left_pay
   * @param {number} payload.total_discount
   * @param {string|Date} payload.created_at
   */
  constructor(payload) {
    super(payload);

    this.status = payload?.status ?? null;
    this.discount = payload?.discount ?? 0;
    this.user_id = payload?.user_id ?? null;
    this.user = payload?.user ?? null;
    this.clinic_id = payload?.clinic_id ?? null;
    this.clinic = payload?.clinic ?? null;
    this.appointment_id = payload?.appointment_id ?? null;
    this.appointment = payload?.appointment ?? null;

    this.subjects = payload?.subjects || []; // only for create
    this.payment_subjects = payload?.payment_subjects ?? [];
    this.transactions_ids = payload?.transactions_ids ?? [];
    this.transactions = payload?.transactions ?? [];

    this.description = payload?.description ?? null;
    this.total_amount = payload?.total_amount ?? 0;
    this.discounted_amount = payload?.discounted_amount ?? payload?.total_amount ?? 0;
    this.left_pay = payload?.left_pay ?? 0;
    this.total_discount = payload?.total_discount ?? 0;
    this.created_at = payload?.created_at ?? null;
  }

  static enum = {
    statuses: {
      Paid: 'paid',
      PartiallyPaid: 'partially_paid',
      NotPaid: 'not_paid',
      Refund: 'refund',
      Canceled: 'canceled',
    },
  };
}
