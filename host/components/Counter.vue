<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "../stores/counter";
const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
</script>

<template>
  <button class="counter" @click="counterStore.increment">
    Host counter: {{ count }}
  </button>
</template>