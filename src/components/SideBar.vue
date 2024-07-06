<template>
  <div :class="[store.showSidebar ? 'w-[260px]' :'w-[70px]']" style="transition: 0.3s ease" class="fixed z-10 h-full bg-gray-200 text-white">
    <div class="bg-gray-900 h-[50px] text-[20px] flex justify-around gap-4 items-center text-center font-bold p-3">
      <div class="flex gap-2">
        <span class="mdi mdi-view-dashboard-outline"></span>
        <span v-if="store.showSidebar"> Dashboard</span>
      </div>
      <span class=" mdi hover:text-gray-400 rounded-xl ease-in duration-200 mdi-chevron-left mdi-36px" v-if="store.showSidebar" @click="ToggleSidebar"></span>
    </div>
    <div class="h-[calc(100vh-50px)] flex flex-col items-center justify-between bg-gray-800 py-2">
      <div class="flex flex-col gap-3 w-full">
        <div v-show="!store.showSidebar" @click="ToggleSidebar" class="flex items-center justify-center">
          <span class="w-[46px] ps-1 hover:text-gray-400 rounded-xl ease-in duration-200 mdi mdi-chevron-right mdi-36px"></span>
        </div>
        <template v-for="(data,index) in data_sidebar" :key="index">
          <div class="flex gap-3 justify-center items-center rounded-xl mx-3 ease-in duration-200 h-[50px] hover:bg-gray-400 ">
            <span :class="[data.icon]" class="mdi mdi-24px"></span>
            <div v-if="store.showSidebar" class="font-bold text-white flex justify-start items-center text-[18px] w-[100px]">
              {{data.text}}
            </div>
          </div>
        </template>
      </div>
      <div class="w-full">
        <div class="flex gap-3 justify-center items-center rounded-xl mx-3 ease-in duration-200 h-[50px] hover:bg-gray-400">
          <span class="mdi mdi-cog mdi-24px"></span>
          <div v-if="store.showSidebar" class="font-bold text-white flex justify-start items-center text-[18px] w-[100px]">
            Setting
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useDataStore} from "@/stores/counter.js";
import {computed} from "vue";
const store = useDataStore()
const data_sidebar = [
  {icon:'mdi-home-outline',text:'Home'},
  {icon:'mdi-account-outline',text:'Profile'},
  {icon:'mdi-message-processing-outline',text:'Message'},
  {icon:'mdi-download-box-outline',text:'Download'},
  {icon:'mdi-help-box-outline',text:'help'},
]
function ToggleSidebar(){
  store.showSidebar = !store.showSidebar
}
</script>
<style scoped>
</style>