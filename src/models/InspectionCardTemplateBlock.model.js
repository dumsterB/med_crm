import { InspectionCardTemplateElement } from '@/models/InspectionCardTemplateElement.model';

export class InspectionCardTemplateBlock extends InspectionCardTemplateElement {
  /**
   * @typedef {InspectionCardTemplateElementConstructorPayload|object} InspectionCardTemplateBlockConstructorPayload
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
   * @property {number} file_id
   * @property {string} src
   * @property {Array<{x: number, y: number, value: string}>} comments
   */

  /** @param {InspectionCardTemplateBlockConstructorPayload|object} [payload] */
  constructor(payload) {
    super({
      ...(payload || {}),
      type: InspectionCardTemplateElement.enum.types.Block,
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
