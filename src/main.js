import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import { Router } from './router';
import { Store } from '@/store';
import { ApiPlugin } from '@/plugins/api.plugin.js';
import { I18nPlugin } from '@/plugins/i18n.plugin';

import UiIcon from '@/components/ui/UiIcon/index.vue';
import UiAvatar from '@/components/ui/UiAvatar/index.vue';

import '@/assets/styles/index.scss';

createApp(App)
  .use(Router)
  .use(Store)
  .use(ApiPlugin)
  .use(I18nPlugin)
  .use(ElementPlus)
  .component('UiIcon', UiIcon)
  .component('UiAvatar', UiAvatar)
  .mount('#app');
