export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--
  return {
    count,
    increment,
    decrement,
  }
})

type useCounterStoreType = typeof useCounterStore

declare global {
  interface Window {
    useCounterStore: useCounterStoreType
  }
}

declare module globalThis {
  let useCounterStore: useCounterStoreType
}

(globalThis || window).useCounterStore = useCounterStore;
