<template>
    <div class="w-full h-[50px] shadow-md flex items-center text-black bg-white sticky top-0 p-2">
      <div class="w-1/6"/>
      <div class="w-5/6 flex justify-between items-center">
       <SearchBoxHeader />
        <DropDown />
      </div>
    </div>
</template>
<script setup>
import {useDataStore} from "@/stores/counter.js";
const store = useDataStore()
function ToggleMenu(){
  store.showSidebar = !store.showSidebar
}
import {RouterLink} from "vue-router";
import SearchBoxHeader from "@/components/Elements/SearchBoxHeader.vue";
import DropDown from "@/components/Elements/DropDown.vue";
</script>