import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { federation } from '@module-federation/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Or any port you like
    hmr: true, // ✅ Enable HMR explicitly
    watch: {
      usePolling: true, // Optional: improves reload reliability in some environments
    },
  },
  plugins: [
    federation({
      name: 'host',
      remotes: {
        remote: {
          type: 'module',
          name: 'remote',
          entry: 'http://localhost:3001/remoteEntry.js',
          entryGlobalName: 'remote',
          shareScope: 'default',
        },
      },
      filename: 'remoteEntry.js',
      shared: ['vue'],
    }),
    vue(),
    vueDevTools(),
  ],
  build: {
    target: 'chrome89',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
