import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import { Router } from './router';
import { Store } from '@/store';

import { ApiPlugin } from '@/plugins/api.plugin.js';
import { I18nPlugin } from '@/plugins/i18n.plugin';

createApp(App).use(Router).use(Store).use(ApiPlugin).use(I18nPlugin).use(ElementPlus).mount('#app');
