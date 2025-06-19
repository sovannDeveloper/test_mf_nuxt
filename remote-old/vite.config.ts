// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from "@module-federation/vite";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";
import pluginVue from "esbuild-plugin-vue-next";

export default defineConfig(async ({ command }) => ({
  server: {
    port: 3001,     // Or any port you like
    hmr: true,      // ✅ Enable HMR explicitly
    watch: {
      usePolling: true,   // Optional: improves reload reliability in some environments
    },
  },
  plugins: [
    await federation({
      options: {
        workspaceRoot: __dirname,
        outputPath: "dist",
        federationConfig: "federation.config.cjs",
        dev: command === "serve",
        verbose: true,
      },
      adapter: createEsBuildAdapter({ plugins: [pluginVue()] }),
    }),
    vue(),
  ],
}));
