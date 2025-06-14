// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      script: [
        { type: 'esms-options', innerHTML: '{ "shimMode": true }' },
        { src: 'https://unpkg.com/es-module-shims', defer: true },
      ]
    }
  },
  modules: [
    '@pinia/nuxt'
  ]
})
