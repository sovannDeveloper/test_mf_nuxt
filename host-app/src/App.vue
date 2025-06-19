<script setup>
import { defineAsyncComponent } from "vue";
const RemoteMFE = defineAsyncComponent(
  () => import("remote/Header")
);
</script>

<template>
  <h1>Host App</h1>
  <div>
    <RemoteMFE v-if="!!RemoteMFE" />
  </div>
</template>