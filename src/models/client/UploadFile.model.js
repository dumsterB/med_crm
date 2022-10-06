/**
 * @class UploadFile - объект этого класса возвращает ElUpload, UiUpload
 */
export class UploadFile {
  /**
   * @param {object} payload
   * @param {number} payload.uid
   * @param {string} payload.name
   * @param {number} payload.percentage
   * @param {UploadStatus} payload.status
   * @param {number} payload.size
   * @param {string} payload.url
   * @param {object} payload.raw
   */
  constructor(payload) {
    this.uid = payload.uid;
    this.name = payload.name;
    this.percentage = payload.percentage;
    this.status = payload.status;
    this.size = payload.size;
    this.url = payload.url;
    this.raw = payload.raw;
  }

  static enum = {
    /** @typedef {'ready'|'uploading'|'success'|'fail'} UploadStatus */
    statuses: {
      Ready: 'ready',
      Uploading: 'uploading',
      Success: 'success',
      Fail: 'fail',
    },
  };
}
