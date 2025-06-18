<script setup>
import { defineAsyncComponent, ref } from "vue";

const isLoaded = ref(false)
const hasError = ref(false)

const RemoteMFE = defineAsyncComponent({
  loader: async () => {
    try {
      const module = await import("remote/App")
      isLoaded.value = true
      return module
    } catch (error) {
      console.error('Failed to load remote module:', error)
      hasError.value = true
      throw error
    }
  },
  errorComponent: {
    template: '<div>Error loading remote component</div>'
  },
  loadingComponent: {
    template: '<div>Loading remote component...</div>'
  }
});
</script>

<template>
  <h1>Host App</h1>
  <div style="border: 1px dotted red;min-height: 500px;">
    <ClientOnly>
      <RemoteMFE v-if="!hasError" />
      <div v-else>Failed to load remote application</div>
    </ClientOnly>
  </div>
</template>