import ApiService from '@/services/api.service.js';

export default {
  install: app => {
    app.config.globalProperties.$api = ApiService;
  },
};
