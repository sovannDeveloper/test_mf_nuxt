<script setup>
import { defineAsyncComponent } from 'vue'

// Dynamically load the remote component from app2
const RemoteApp = defineAsyncComponent(() => import('remoteApp/App'))
</script>

<template>
  <div>
    <div style="margin:10px; padding:10px; text-align:center; background-color:greenyellow;">
      <h1>App1</h1>
    </div>

    <!-- Suspense is native in Vue 3 -->
    <Suspense>
      <template #default>
        <RemoteApp />
      </template>
      <template #fallback>
        <div>loading...</div>
      </template>
    </Suspense>
  </div>
</template>
