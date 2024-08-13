<template>
  <div class="flex w-svw h-svw" v-if="store.isLoggedIn">
    <SideBar />
    <div class="w-full">
      <Header />
      <div class="h-[calc(100vh-70px)]">
        <RouterView />
      </div>
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {RouterView} from 'vue-router';
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
import {useDataStore} from "@/stores/store.ts";
import {onMounted} from "vue";
const store = useDataStore();

function checkIsLoggIn(){
  const token =  localStorage.getItem('authorization')
  if(token){
    store.isLoggedIn = true
  }else{
    store.isLoggedIn = false
  }
}
onMounted(()=>{
  checkIsLoggIn()
})
</script>
