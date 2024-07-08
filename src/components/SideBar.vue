<template>
  <div :class="[store.showSidebar ? 'w-[300px]' :'w-[70px]', 'transition-all', 'duration-500']" class="z-10 h-full text-white">
    <div class="bg-white h-[50px] text-[20px] flex justify-center py-8 items-center text-center font-bold p-3">
      <span v-if="store.showSidebar" class="text-[#4880FF]"> Dash</span>
      <span v-if="store.showSidebar" class="text-black"> Board</span>
      <span @click="ToggleSidebar" v-if="!store.showSidebar" class="cursor-pointer mdi mdi-menu-open mdi-24px text-[#202224]"></span>
    </div>
    <div class="h-[calc(100vh-90px)] flex flex-col items-center justify-between bg-white py-2">
      <div class="flex flex-col gap-2 w-full">
        <template v-for="(data, index) in data_sidebar" :key="index">
          <div :class="[!store.showSidebar?'!px-2':'',index === 4?'border-b pb-4':'']" class="px-5">
            <div class="flex gap-3 justify-center items-center rounded-xl ease-in duration-200 h-[50px] hover:bg-[#4880FF] hover:text-white group ">
              <span :class="[data.icon]" class="text-[#202224] group-hover:text-white mdi mdi-24px"></span>
              <transition>
                <span v-if="store.showSidebar"
                      class="font-medium text-[#202224] group-hover:text-white flex justify-start items-center text-[16px] w-[100px]">
                      {{ data.text }}
                </span>
              </transition>
            </div>
          </div>
        </template>
      </div>
      <div :class="{'!px-2': !store.showSidebar}" class="w-full px-3">
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
const store = useDataStore();
const data_sidebar = [
  { icon: 'mdi-view-dashboard-outline', text: 'Dashboard' },
  { icon: 'mdi-basket-outline', text: 'Products' },
  { icon: 'mdi-heart-outline', text: 'Favorites' },
  { icon: 'mdi-message-outline', text: 'Chat' },
  { icon: 'mdi-format-list-bulleted', text: 'Order Lists' },
];

function ToggleSidebar() {
  store.showSidebar = !store.showSidebar;
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