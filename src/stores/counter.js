import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
  const showSidebar = ref(false)

  return { showSidebar }
})
