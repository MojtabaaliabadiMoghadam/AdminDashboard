<template>
  <div class="relative">
    <div class="flex justify-around gap-3 items-center me-20 cursor-pointer select-none" @click="ChangeDropDown">
      <img class="h-[40px] w-[40px]" src="@/assets/images/profile.png">
      <div class="flex flex-col">
        <span class="text-[14px] font-medium">Moni Roy</span>
        <span class="text-[14px] font-light">Admin</span>
      </div>
      <div class="cursor-pointer border border-gray-400 rounded-full flex items-center justify-center h-[18px] w-[18px]">
        <span class="mdi mdi-chevron-down"></span>
      </div>
    </div>
    <transition name="fade">
      <div
          :class="ShowComputed"
          class="absolute bg-white border border-gray-300 top-[50px] py-1 w-[200px] rounded shadow-md flex flex-col
         animate-none
         ">
        <div class="w-100 cursor-pointer select-none transition ease-in py-2 px-2 hover:bg-gray-200">
          Account
        </div>
        <div class="w-100 cursor-pointer select-none transition ease-in py-2 px-2 hover:bg-gray-200">
          Support
        </div>
        <div class="w-100 cursor-pointer select-none transition ease-in py-2 px-2 hover:bg-gray-200">
          License
        </div>
        <div class="w-100 cursor-pointer select-none transition ease-in py-2 px-2 hover:bg-gray-200">
          Sign Out
        </div>
      </div>
    </transition>
  </div>

</template>
<script setup lang="ts">
import {computed, ref} from "vue";
const toggleDropDown = ref<boolean>(false)
function ChangeDropDown (){
  toggleDropDown.value = !toggleDropDown.value
}
const ShowComputed = computed(()=>{
  if(toggleDropDown.value){
    return 'block'
  }else{
    return 'hidden'
  }
})
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>