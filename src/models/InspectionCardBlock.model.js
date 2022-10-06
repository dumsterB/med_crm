import { InspectionCardElement } from '@/models/InspectionCardElement.model';

export class InspectionCardBlock extends InspectionCardElement {
  /**
   * @typedef {InspectionCardElementConstructorPayload|object} InspectionCardBlockConstructorPayload
   * @property {string} category_id
   * @property {AnswerTypesEnum} answer_type
   * @property {Array<{label: string, value: string}>} options
   * @property {object} [meta]
   *   @property {string} [meta.pattern]
   *   @property {boolean} [meta.required = false]
   *   @property {boolean} [meta.multiple = false]
   *   @property {boolean} [meta.disabled = false]
   *   @property {string|number} [meta.min]
   *   @property {string|number} [meta.max]
   *
   *   @property {boolean} [enable_custom_answer = false]
   *   @property {boolean} [enable_comments = false]
   *
   * @property {object} answer
   *   @property {number|string|Array<number|string|FileAnswer>} answer.value
   *   @property {boolean} answer.isCustom
   */
  /**
   * @typedef {Array<object>} FileAnswer
   * @property {File} file // File model
   * @property {Array<{x: number, y: number, value: string}>} comments
   */

  /** @param {InspectionCardBlockConstructorPayload|object} [payload] */
  constructor(payload) {
    super({
      ...(payload || {}),
      type: InspectionCardElement.enum.types.Block,
    });

    this.category_id = payload?.category_id ?? null;
    this.answer_type = payload?.answer_type ?? null;
    this.options = payload?.options ?? [];
    this.meta = {
      pattern: payload?.meta?.pattern ?? null,
      required: payload?.meta?.required ?? false,
      multiple: payload?.meta?.multiple ?? false,
      disabled: payload?.meta?.disabled ?? false,
      min: payload?.meta?.min ?? null,
      max: payload?.meta?.max ?? null,

      enable_custom_answer: payload?.meta?.enable_custom_answer ?? false,
      enable_comments: payload?.meta?.enable_comments ?? false,
    };

    this.answer = {
      value: payload?.answer?.value ?? null,
      isCustom: payload?.answer?.isCustom ?? null,
    };
  }

  static enum = {
    /** @typedef {'input'|'textarea', 'select', 'checkbox', 'date', 'file'} AnswerTypesEnum */
    answerTypes: {
      Input: 'input',
      Textarea: 'textarea',
      Select: 'select',
      Checkbox: 'checkbox',
      Date: 'date',
      File: 'file',
    },
  };
}
