/**
 * @class GlobalModalOrDrawerAction
 * @property {string} name
 * @property {any} [data = {}]
 * @property {any} [event]
 * @property {"modal", "drawer"} _type
 */
export class GlobalModalOrDrawerAction {
  constructor({ name, data, event, type }) {
    this.name = name;
    this.data = data ?? {};
    this.event = event ?? null;
    this._type = type;
  }
}
