<template>
  <div :class="[store.showSidebar ? 'w-[300px]' :'w-[70px]', 'transition-all', 'duration-500']" class="z-10 h-full text-white">
    <div class="bg-white h-[72px] text-[20px] flex justify-center py-8 items-center text-center font-bold p-3 border-b-2 border-blue-500">
      <span v-if="store.showSidebar" class="text-black"> Board</span>
      <span v-if="store.showSidebar" class="text-[#4880FF]"> Dash</span>
      <span @click="ToggleSidebar" v-if="!store.showSidebar" class="cursor-pointer mdi mdi-menu-open mdi-24px text-[#202224]"></span>
    </div>
    <div class="h-[calc(100vh-72px)] flex flex-col items-center justify-between bg-white py-2">
      <div class="w-full">
        <div class="flex flex-col gap-2 w-full">
          <template v-for="(data, index) in data_up_sidebar" :key="index">
            <div @click="changePage(data.path,data?.name || '')" :class="[!store.showSidebar?'!px-2':'',index === 4?'border-b pb-4':'']" class="px-5 cursor-pointer">
              <div class="flex gap-3 justify-center items-center rounded-xl ease-in duration-200 h-[50px] hover:bg-[#4880FF] hover:text-white group " :class="{'!bg-[#4880FF]' : route.path == data.path}">
                <span :class="[data.icon,route.path == data.path ? 'text-white':null]" class="text-[#202224] group-hover:text-white mdi mdi-24px"></span>
                <transition>
                <span v-if="store.showSidebar" class="font-medium text-[#202224] group-hover:text-white flex justify-start items-center text-[16px] w-[100px]" :class="{'!text-white' : route.path == data.path}">
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
      <div @click="isModalLogout = true" :class="{'!px-2': !store.showSidebar}" class="w-full px-5 cursor-pointer">
        <div class="flex gap-3 justify-center items-center rounded-xl ease-in duration-200 h-[50px] hover:bg-[#4880FF] hover:text-white group">
          <span class="mdi text-[#202224] mdi-close mdi-24px group-hover:text-white"></span>
          <transition>
            <div v-if="store.showSidebar" class="font-bold text-[#202224] flex justify-start items-center text-[18px] w-[100px] group-hover:text-white">
              خروج
            </div>
          </transition>
        </div>
      </div>
    </div>
    <base-modal @confirm="logOut" v-model="isModalLogout" @update:isOpen="isModalLogout = $event" title="خروج">
      <template #body>
        <div class="min-w-[400px] flex">
          <span class="text-[18px] font-medium flex w-full justify-start">
            آیا میخواهید خارج شوید؟
          </span>
        </div>
      </template>
      <template #buttons>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
         font-medium rounded-lg text-sm px-10 py-3 w-[170px] me-2 mb-2 focus:outline-none">
          خروج
        </button>
        <button @click="isModalLogout = false" type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300
        font-medium rounded-lg text-sm px-10 py-3 me-2 mb-2 ">
          لغو
        </button>
      </template>
    </base-modal>
  </div>
</template>
<script setup lang="ts" >
import { useDataStore } from "@/stores/store.ts"
import {useRoute, useRouter} from "vue-router"
import {fetchData, isFilled, showErrorToast} from "@/Helpers/helper"
import BaseModal from "@/components/UIKit/baseModal.vue"
import {ref} from "vue"
//imports
const route = useRoute()
const router = useRouter()
const store = useDataStore()
const data_up_sidebar = [
  { icon: 'mdi-view-dashboard-outline', text: 'داشبورد' ,path:'/admin/dashboard'},
  { icon: 'mdi-account-multiple-outline', text: 'لیست کاربران' ,path:'/admin/list-of-users'},
  { icon: 'mdi-book-open-outline', text: 'لیست مقالات' ,path:'/admin/list-of-articles'},
  { icon: 'mdi-account-multiple', text: 'کاربران لاتاری' ,path:'/admin/list-of-lottery-users'},
  { icon: 'mdi-account-multiple', text: 'سوالات متداول' ,path:'api/admin/list-of-faqs',name:'list-of-faqs'},
  { icon: 'mdi-account-multiple', text: 'لیست پرداخت' ,path:'api/admin/list-of-payments',name:'list-of-payments'},
  { icon: 'mdi-account-multiple', text: 'لیست فاکتور' ,path:'api/admin/list-of-factors',name:'list-of-factors'},
];
const isModalLogout = ref<boolean>(false)
//variables
function ToggleSidebar() {
  store.showSidebar = !store.showSidebar;
}
function changePage(pathIn,name=''){
  if(isFilled(name)){
    router.push({name})
  }
  router.push({path:pathIn})
}

async function logOut(){
  let url_ = `/api/logout`
  const { status, message } = await fetchData({
    endpoint:url_,
    authorization: true,
    method:'POST'
  })
  if (status == 200){
    store.clearToken();
    isModalLogout.value = false;
    await router.push('/login');
  }else{
    showErrorToast(message)
  }
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