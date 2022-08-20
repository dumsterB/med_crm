export class EventCalendarEvent {
  /**
   * @param {object} payload
   * @param {string} payload.title
   * @param {string} [payload.description]
   * @param {string} [payload.startAt] DD.MM.YY hh:mm
   * @param {string} [payload.endAt] DD.MM.YY hh:mm
   */
  constructor(payload) {
    this.title = payload.title;
    this.descripton = payload?.description ?? null;
    this.startAt = payload?.startAt ?? null;
    this.endAt = payload?.endAt ?? null;
  }
}
