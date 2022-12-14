export class EventCalendarEvent {
  /**
   * @param {object} payload
   * @param {string} payload.title
   * @param {string} [payload.description]
   * @param {string} [payload.startAt] DD.MM.YY hh:mm
   * @param {string} [payload.endAt] DD.MM.YY hh:mm
   * @param {object} [payload.payload]
   */
  constructor(payload) {
    this.title = payload.title;
    this.description = payload?.description ?? null;
    this.startAt = payload?.startAt ?? null;
    this.endAt = payload?.endAt ?? null;
    this.payload = payload?.payload ?? null;
  }
}
