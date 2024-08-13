<template>
    <div class="w-full h-[70px] shadow-md flex items-center justify-between bg-white sticky top-0 p-2">
      <div class="ps-5 flex gap-8">
        <span v-if="store.showSidebar" @click="ToggleMenu" class="mdi mdi-menu mdi-24px cursor-pointer"></span>
        <SearchBoxHeader />
      </div>
      <div class="flex gap-24  justify-between items-center">
        <NotificationDropDown class="pt-2" />
        <DropDown />
      </div>
    </div>
</template>
<script setup>
import {useDataStore} from "@/stores/store.ts";
const store = useDataStore()
function ToggleMenu(){
  store.showSidebar = !store.showSidebar
}
import {RouterLink} from "vue-router";
import SearchBoxHeader from "@/components/Elements/SearchBoxHeader.vue";
import DropDown from "@/components/Elements/DropDown.vue";
import NotificationDropDown from "@/components/Elements/NotificationDropDown.vue";
</script>