import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import { Router } from './router';
import { Store } from '@/store';
import { ApiPlugin } from '@/plugins/api.plugin.js';
import { I18nPlugin } from '@/plugins/i18n.plugin';

import '@/assets/styles/index.scss';

const app = createApp(App).use(Router).use(Store).use(ApiPlugin).use(I18nPlugin).use(ElementPlus);

const UiComponents = import.meta.glob('./components/ui/**/*.vue', { eager: true });
for (let key in UiComponents) {
  const component = UiComponents[key].default;
  app.component(component.name, component);
}

app.mount('#app');
