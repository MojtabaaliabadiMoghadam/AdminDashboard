import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', () => {
  const showSidebar = ref<boolean>(true);
  const mobile = ref<number | null>(null);
  const isLoggedIn = ref(false);
  const token = ref<string | null>(localStorage.getItem('authorization'));

  // استفاده از computed برای وضعیت ورود
  const isLoggIn = computed(() => !!token.value);

  // توابع برای مدیریت توکن و وضعیت ورود
  function setToken(newToken: string) {
    token.value = newToken;
    isLoggedIn.value = true;
    localStorage.setItem('authorization', newToken);
  }

  function clearToken() {
    token.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem('authorization');
  }

  return {
    showSidebar,
    mobile,
    isLoggedIn,
    setToken,
    clearToken,
  };
});
