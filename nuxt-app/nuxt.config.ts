import { federation } from '@module-federation/vite';
import {
  withNativeFederation,
  shareAll
} from "@softarc/native-federation/build";

console.log('---------->', shareAll({
  singleton: true,
  strictVersion: true,
  requiredVersion: "auto",
  includeSecondaries: false,
}));

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    experimental: {
      wasm: true
    }
  },
  vite: {
    plugins: [
      federation({
        name: "host",
        remotes: {
          remote: {
            type: "module",
            name: "remote",
            entry: "http://localhost:3001/remoteEntry.js",
            entryGlobalName: "remote",
            shareScope: "default",
          },
        },
        shared: {
          '@module-federation/vite':
          {
            singleton: true,
            strictVersion: true,
            requiredVersion: '^1.4.1',
          },
          nuxt:
          {
            singleton: true,
            strictVersion: true,
            requiredVersion: '^3.17.5',
          },
          vue:
          {
            singleton: true,
            strictVersion: true,
            requiredVersion: '^3.5.16',
          },
          'vue-router':
          {
            singleton: true,
            strictVersion: true,
            requiredVersion: '^4.5.1',
          }
        }
      }),
    ],
    build: {
      target: 'chrome89',
    },
  }
})
