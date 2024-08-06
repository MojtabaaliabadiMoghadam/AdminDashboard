<template>
  <div :class="[store.showSidebar ? 'w-[300px]' :'w-[70px]', 'transition-all', 'duration-500']" class="z-10 h-full text-white">
    <div class="bg-white h-[50px] text-[20px] flex justify-center py-8 items-center text-center font-bold p-3">
      <span v-if="store.showSidebar" class="text-[#4880FF]"> Dash</span>
      <span v-if="store.showSidebar" class="text-black"> Board</span>
      <span @click="ToggleSidebar" v-if="!store.showSidebar" class="cursor-pointer mdi mdi-menu-open mdi-24px text-[#202224]"></span>
    </div>
    <div class="h-[calc(100vh-64px)] flex flex-col items-center justify-between bg-white py-2">
      <div class="w-full">
        <div class="flex flex-col gap-2 w-full">
          <template v-for="(data, index) in data_up_sidebar" :key="index">
            <div @click="changePage(data.path)" :class="[!store.showSidebar?'!px-2':'',index === 4?'border-b pb-4':'']" class="px-5">
              <div
                  class="flex gap-3 justify-center items-center rounded-xl ease-in duration-200 h-[50px] hover:bg-[#4880FF] hover:text-white group "
                  :class="{'!bg-[#4880FF]' : route.path == data.path}"
              >
                <span :class="[data.icon]" class="text-[#202224] group-hover:text-white mdi mdi-24px"></span>
                <transition>
                <span v-if="store.showSidebar"
                      class="font-medium text-[#202224] group-hover:text-white flex justify-start items-center text-[16px] w-[100px]"
                      :class="{'!text-white' : route.path == data.path}"
                >
                      {{ data.text }}
                </span>
                </transition>
              </div>
            </div>
          </template>
        </div>
<!--        <div class="flex flex-col gap-2 w-full pt-3">-->
<!--          <template v-for="(data, index) in data_down_sidebar" :key="index">-->
<!--            <div :class="[!store.showSidebar?'!px-2':'',index === 6?'border-b pb-4':'']" class="px-5">-->
<!--              <div class="flex gap-3 justify-center items-center rounded-xl ease-in duration-200 h-[50px] hover:bg-[#4880FF] hover:text-white group ">-->
<!--                <span :class="[data.icon]" class="text-[#202224] group-hover:text-white mdi mdi-24px"></span>-->
<!--                <transition>-->
<!--                <span v-if="store.showSidebar"-->
<!--                      class="font-medium text-[#202224] group-hover:text-white flex justify-start items-center text-[16px] w-[100px]">-->
<!--                      {{ data.text }}-->
<!--                </span>-->
<!--                </transition>-->
<!--              </div>-->
<!--            </div>-->
<!--          </template>-->
<!--        </div>-->
      </div>
      <div :class="{'!px-2': !store.showSidebar}" class="w-full px-5">
        <div class="flex gap-3 justify-center items-center rounded-xl ease-in duration-200 h-[50px] hover:bg-[#4880FF] hover:text-white group">
          <span class="mdi text-[#202224] mdi-cog mdi-24px group-hover:text-white"></span>
          <transition>
            <div v-if="store.showSidebar" class="font-bold text-[#202224] flex justify-start items-center text-[18px] w-[100px] group-hover:text-white">
              Setting
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDataStore } from "@/stores/counter.js";
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
const store = useDataStore();
const data_up_sidebar = [
  { icon: 'mdi-view-dashboard-outline', text: 'Dashboard' ,path:'/'},
  { icon: 'mdi-account-multiple-outline', text: 'List of users' ,path:'/list-of-users'},
  { icon: 'mdi-book-open-outline', text: 'List of articles' ,path:'/list-of-articles'},
];
// const data_down_sidebar = [];

function ToggleSidebar() {
  store.showSidebar = !store.showSidebar;
}
function changePage(pathIn){
  router.push({path:pathIn})
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>