import { GlobalModalOrDrawerAction } from '@/models/client/ModalAndDrawer/GlobalModalOrDrawerAction';

export class GlobalDrawerAction extends GlobalModalOrDrawerAction {
  constructor() {
    super({ type: 'drawer' });
  }
}
