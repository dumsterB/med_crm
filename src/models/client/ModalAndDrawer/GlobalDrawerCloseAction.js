import { GlobalDrawerAction } from '@/models/client/ModalAndDrawer/GlobalDrawerAction';

export class GlobalDrawerCloseAction extends GlobalDrawerAction {
  constructor() {
    super({ name: 'close' });
  }
}
