/**
 * @class InvoicePaymentSubject
 */
export class InvoicePaymentSubject {
  /**
   * @param {object} [payload]
   * @param {string} payload.description
   * @param {number} payload.discount
   * @param {string} payload.type
   * @param {Service, ServiceGroup} payload.subject
   */
  constructor(payload) {
    this.description = payload?.description ?? null;
    this.discount = payload?.discount ?? null;
    this.type = payload?.type ?? null;
    this.subject = payload?.subject ?? null;
  }

  static enum = {
    types: {
      Service: 'service',
      GroupService: 'group_service',
    },
  };
}
