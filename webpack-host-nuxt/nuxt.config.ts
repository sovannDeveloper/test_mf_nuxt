import webpack from 'webpack'
const { ModuleFederationPlugin } = webpack.container

export default defineNuxtConfig({
  builder: 'webpack',
  ssr: false,
  compatibilityDate: '2025-06-19',
  webpack: {
    analyze: false,
    extractCSS: true,
  },
  hooks: {
    'webpack:config'(configs) {
      for (const config of configs) {
        config.plugins = config.plugins || []
        config.resolve ||= {}

        config.plugins.push(
          new ModuleFederationPlugin({
            name: 'hostApp',
            remotes: {
              remoteApp: 'remoteApp@http://localhost:3001/_nuxt/remoteEntry.js'
            },
            shared: {
              vue: { singleton: true, eager: true },
              'vue-router': { singleton: true, eager: true }
            }
          })
        ),

          config.resolve = config.resolve || {}
        config.resolve.alias = config.resolve.alias || {} as Record<string, string | false | string[]>
        (config.resolve.alias as Record<string, string | false | string[]>)['remoteApp'] = false
      }
    }
  }
})
