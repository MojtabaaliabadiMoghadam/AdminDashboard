import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
  const showSidebar = ref(true)
  const mobile = ref<number|null>(null)
  return {
    showSidebar ,
    mobile
  }
})
