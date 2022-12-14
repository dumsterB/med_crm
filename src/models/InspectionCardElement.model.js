/**
 * @class InspectionCardElement
 */
export class InspectionCardElement {
  /**
   * @typedef {object} InspectionCardElementConstructorPayload
   * @property {string} [id] hash
   * @property {string} [label]
   * @property {string} type
   * @property {number|string} [order = 1]
   */
  /** @param {InspectionCardElementConstructorPayload|object} payload */
  constructor(payload) {
    this.id = payload?.id ?? null;
    this.label = payload?.label ?? null;
    this.type = payload?.type ?? null;
    this.order = payload?.order ?? 1;
  }

  static enum = {
    types: {
      Block: 'block',
      Category: 'category',
    },
  };
}
