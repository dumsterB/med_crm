import { createApp } from 'vue';
import App from './App.vue';
import { Router } from './router';
import { Store } from '@/store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { ApiPlugin } from '@/plugins/api.plugin.js';

createApp(App).use(Router).use(Store).use(ApiPlugin).use(ElementPlus).mount('#app');
