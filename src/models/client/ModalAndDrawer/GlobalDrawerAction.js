import { GlobalModalOrDrawerAction } from '@/models/client/ModalAndDrawer/GlobalModalOrDrawerAction';

export class GlobalDrawerAction extends GlobalModalOrDrawerAction {
  /**
   * @param {string} name
   * @param {object} data
   * @param {any} event
   */
  constructor({ name, data, event }) {
    super({ type: 'drawer', name, data, event });
  }
}
