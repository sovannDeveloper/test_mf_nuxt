import { defineNuxtModule, extendViteConfig, addVitePlugin, createResolver, addPlugin } from '@nuxt/kit'
import { federation } from '@module-federation/vite'
import { createEsBuildAdapter } from '@softarc/native-federation-esbuild'

export default defineNuxtModule({
  setup(_, nuxt) {
    // @ts-ignore
    const { resolve } = createResolver(import.meta.url)

    addPlugin({
      src: resolve('./plugin.ts'),
      mode: 'client',
      order: 1
    })

    if (nuxt.options.dev) {
      extendViteConfig((config) => {
        config.resolve = config.resolve || {}
        config.resolve.alias = config.resolve.alias || {}
        config.resolve.alias['vue'] = resolve('../../node_modules/vue/dist/vue.runtime.esm-bundler.js')
        config.resolve.alias['pinia'] = resolve('../../node_modules/pinia/dist/pinia.mjs')
      })
    }

    addVitePlugin(
      federation({
        options: {
          workspaceRoot: __dirname,
          outputPath: '../../public',
          tsConfig: 'tsconfig.json',
          federationConfig: 'federation.config.cjs',
          verbose: false,
          dev: nuxt.options.dev,
        },
        adapter: createEsBuildAdapter({ plugins: [] }),
      }),
      { prepend: true, server: false }
    )
  },
})
