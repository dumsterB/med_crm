import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Импоритируем вручную, иначе выкидывает ошибку при использовании ElConfigProvider
import { ElSelect, ElOption } from 'element-plus';
import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/option/style/css';

import apiPlugin from '@/plugins/api.plugin.js';

createApp(App)
  .use(router)
  .use(apiPlugin)
  .component('ElSelect', ElSelect)
  .component('ElOption', ElOption)
  .mount('#app');
