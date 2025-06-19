export default defineNuxtConfig({
  compatibilityDate: '2025-06-19',
  builder: 'webpack',
  ssr: false,
  hooks: {
    'webpack:config'(webpackConfigs) {
      for (const config of webpackConfigs) {
        config.plugins = config.plugins || []

        config.output = {
          ...config.output,
          publicPath: 'http://localhost:3001/_nuxt/', // 👈 very important
        }

        const { ModuleFederationPlugin } = require('webpack').container

        config.plugins.push(
          new ModuleFederationPlugin({
            name: 'remoteApp',
            filename: 'remoteEntry.js',
            exposes: {
              './App': './app.vue',
            },
            shared: {
              vue: {
                singleton: true,
                eager: true,
                requiredVersion: false,
              },
              'vue-router': {
                singleton: true,
                eager: true,
                requiredVersion: false,
              },
            },
          })
        );

        // Module Federation optimization settings
        // config.optimization = {
        //   ...config.optimization,
        //   splitChunks: false,
        //   runtimeChunk: false,
        // };
      }
    }
  }
})
