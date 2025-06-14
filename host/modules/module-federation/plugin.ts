import { initFederation } from '@softarc/native-federation'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', async (app) => {
    await initFederation({
      'remote-app': 'http://localhost:5001/remoteEntry.json'
    })
  })
})
