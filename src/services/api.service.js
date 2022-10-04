import axios from 'axios';
import { EmitterService } from '@/services/emitter.service';
import { API_LOGOUT_EMIT } from '@/enums/emits.enum';

const instance = axios.create({
  mode: 'no-cors',
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

instance.setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
instance.removeToken = () => {
  delete instance.defaults.headers.common.Authorization;
};
instance.setLocale = (locale) => {
  instance.defaults.headers.common.Lang = locale;
};
instance.removeLocale = () => {
  delete instance.defaults.headers.common.Lang;
};

instance.interceptors.request.use(
  (config) => {
    // Удаляем лишние передние символы '/'
    return {
      ...config,
      url: config.url.replace(/^\/*(.*)/gi, (str, path) => `/${path}`),
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res;
  },
  (err) => {
    if (err?.response?.status === 401) {
      // В проекте нету системы di, поэтому местами пользуемся глобальным емитером
      EmitterService.emit(API_LOGOUT_EMIT);
    }
    if (err?.response?.status === 403) {
      // store.dispatch("auth/logout");
    }

    return Promise.reject(err);
  }
);

export { instance as ApiService };
