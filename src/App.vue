<template>
  <div class="flex w-svw h-svw">
      <SideBar />
    <div class="w-full">
      <Header />
      <div class="h-[calc(100vh-60px)]">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";

</script>
<style scoped>

</style>
