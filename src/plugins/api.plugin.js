import { ApiService } from '@/services/api.service.js';

export const ApiPlugin = {
  install: app => {
    app.config.globalProperties.$api = ApiService;
  },
};
