<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "../stores/counter";
const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
</script>

<template>
  <button
    @click="counterStore.increment"
  >
    Remote counter: {{ count }}
  </button>
</template>