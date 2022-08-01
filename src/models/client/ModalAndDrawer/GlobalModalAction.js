import { GlobalModalOrDrawerAction } from '@/models/client/ModalAndDrawer/GlobalModalOrDrawerAction';

export class GlobalModalAction extends GlobalModalOrDrawerAction {
  constructor(payload) {
    super({ type: 'modal', ...payload });
  }
}
