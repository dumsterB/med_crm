import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';

export class GlobalModalCloseAction extends GlobalModalAction {
  constructor() {
    super({ name: 'close' });
  }
}
