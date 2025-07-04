import webpack from 'webpack'
const { ModuleFederationPlugin } = webpack.container

export default defineNuxtConfig({
  builder: 'webpack',

  hooks: {
    'webpack:config'(configs) {
      for (const config of configs) {
        config.plugins = config.plugins || []

        config.plugins.push(
          new ModuleFederationPlugin({
            name: 'nuxt3Host',
            remotes: {
              remoteApp: 'remoteApp@http://localhost:3001/_nuxt/remoteEntry.js'
            },
            shared: {
              vue: { singleton: true, eager: true },
              'vue-router': { singleton: true, eager: true }
            }
          })
        )
      }
    }
  }
})
