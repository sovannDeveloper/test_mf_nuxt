
import { defineStore } from "pinia";
import { ref } from 'vue'

const _useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--
  return {
    count,
    increment,
    decrement,
  }
})

type useCounterStoreType = typeof _useCounterStore

declare global {
  interface Window {
    useCounterStore: useCounterStoreType
  }
}

export const useCounterStore = window.useCounterStore || _useCounterStore;