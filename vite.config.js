import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    vueI18n({
      compositionOnly: false,
      runtimeOnly: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: 'localhost',
    port: 3030,
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Глобальные SCSS, переменная, миксины и т.д.
        additionalData: '@import "./src/assets/styles/globals/index.scss";',
      },
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
