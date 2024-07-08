<template>
  <div>
    <Menu as="div" class="relative">
      <div>
        <MenuButton>
          <div class="relative">
            <img src="@/assets/images/icon.png">
          </div>
          <span class="absolute h-5 w-5 -right-3 -top-2 rounded-full bg-red-700 text-white text-[13px] flex items-center justify-center">6</span>
        </MenuButton>
      </div>
      <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
            class="z-30 absolute bg-white border border-gray-300 top-[35px] -right-[100px]  rounded-2xl shadow-md flex flex-col"
        >
          <div  class="flex items-center gap-3 py-3 w-100 text-{12px} text-nowrap font-medium text-[#404040] border-b
                 cursor-pointer select-none transition ease-in px-6">
            Notification
          </div>
          <template
              v-for="(data,index) in data_dropdown"
              :key="index"
          >
            <MenuItem v-slot="{ active }">
              <div :class="[data.extra_class]" class="flex items-center gap-3 w-100 text-13px text-nowrap font-bold text-[#404040]
                 cursor-pointer select-none transition ease-in py-3 px-6 hover:bg-gray-200">
                <span :class="[data.icon , data.color]" class="mdi flex items-center justify-center  text-white h-9 w-9 rounded-full"></span>
                {{data.text}}
              </div>
            </MenuItem>
          </template>
          <div  class="flex justify-center items-center gap-3 py-3 w-100 text-{12px} text-nowrap font-medium text-[#A8A8A8] border-t
                 cursor-pointer select-none transition ease-in px-6">
            See all notifications
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ref} from "vue";
const toggleDropDown = ref<boolean>(false)
function ChangeDropDown (){
  toggleDropDown.value = !toggleDropDown.value
}
const data_dropdown = [
  {extra_class:'', color:'bg-[#4E96FF]', icon: 'mdi-account-edit', text: 'Manage Account'},
  {extra_class:'',color:'bg-[#F97FD9]', icon: 'mdi-key-variant', text: 'Change Password'},
  {extra_class:'',color:'bg-[#9E8FFF]', icon: 'mdi-refresh', text: 'Activity Log'},
  {extra_class:'', color:'bg-[#FF8F8F]', icon: 'mdi-logout', text: 'Log Out'},
];
function closeDropdown() {
  console.log('run')
  toggleDropDown.value = false;
}

</script>
<style scoped>
</style>