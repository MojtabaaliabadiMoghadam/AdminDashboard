<template>
  <!-- Check if the user is logged in -->
  <div class="flex w-svw h-svw" v-if="isLoggedIn">
    <SideBar />
    <div class="w-full">
      <Header />
      <div class="h-[calc(100vh-60px)]">
        <RouterView />
      </div>
    </div>
  </div>
  <!-- Show login page if not logged in -->
  <div v-else>
    <router-view></router-view>
  </div>
</template>
<script setup>
import {RouterLink, RouterView, useRouter} from 'vue-router'
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
import {computed} from "vue";


const isLoggedIn = computed(() => {
  return !!localStorage.getItem('authorization');
});

// Automatically redirect to the login page if not logged in
const router = useRouter();

if (!isLoggedIn.value) {
  router.push('/login'); // Ensure your login route path is set correctly
}
</script>
<style scoped>

</style>
