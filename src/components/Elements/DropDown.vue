<template>
  <div>
    <Menu as="div" class="relative">
      <div>
        <MenuButton
            class="flex justify-around gap-5 items-center me-20 cursor-pointer select-none"
        >
          <img class="h-[40px] w-[40px] rounded-full" src="@/assets/images/user6.jpg">
          <div class="flex flex-col">
            <span class="text-[14px] font-bold">Moni Roy</span>
            <span class="text-[14px] font-medium">Admin</span>
          </div>
          <div class="cursor-pointer border border-gray-400 rounded-full flex items-center justify-center h-[18px] w-[18px]">
            <span class="mdi mdi-chevron-down"></span>
          </div>
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
            class="z-30 absolute bg-white border border-gray-300 top-[45px] right-[50px]  rounded-2xl shadow-md flex flex-col"
        >
          <template
              v-for="(data,index) in data_dropdown"
              :key="index"
          >
            <MenuItem v-slot="{ active }">
                <div :class="[data.extra_class]" class="flex items-center gap-3 w-100 text-13px text-nowrap font-bold text-[#404040] border-b
                 cursor-pointer select-none transition ease-in py-1.5 px-6 hover:bg-gray-200">
                  <span :class="[data.icon , data.color]" class="mdi mdi-24px"></span>
                  {{data.text}}
                </div>
            </MenuItem>
          </template>
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
  {extra_class:'rounded-t-2xl', color:'text-[#4E96FF]', icon: 'mdi-account-edit', text: 'Manage Account'},
  {extra_class:'',color:'text-[#F97FD9]', icon: 'mdi-key-variant', text: 'Change Password'},
  {extra_class:'',color:'text-[#9E8FFF]', icon: 'mdi-refresh', text: 'Activity Log'},
  {extra_class:'rounded-b-2xl', color:'text-[#FF8F8F]', icon: 'mdi-logout', text: 'Log Out'},
];
function closeDropdown() {
  console.log('run')
  toggleDropDown.value = false;
}

</script>
<style scoped>
</style>