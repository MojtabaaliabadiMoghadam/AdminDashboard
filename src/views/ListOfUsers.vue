<template>
  <LayoutOfPages>
    <template #header>
      <span class="font-bold text-[24px]">لیست کاربران</span>
    </template>
    <div class="flex flex-col gap-10">
      <div class="grid grid-cols-12 items-center">
        <div class="inline-flex col-span-2">
          <base-input label="جستجو" v-model="searchInput" placeholder="جستجو کنید">
            <template #icon>
              <span class="mdi mdi-magnify" />
            </template>
          </base-input>
        </div>
        <div class="col-span-2">
          <base-select label="وضعیت کاربر"/>
        </div>
      </div>
      <Table
          :headers="dataTable.headers"
          :url="dataTable.url"
          :parameters="dataTable.params"
          :key="dataTable.key"
      >
        <template #created_at="{item}">
            {{formatDate(item.created_at)}}
        </template>
        <template #settings>
          <div class="flex items-center justify-center">
            <span @click="isModalOpen = true" class="h-10 w-10  rounded-full p-2 hover:bg-blue-100 mdi mdi-cog mdi-24px text-blue-500 transition-all
             delay-75 cursor-pointer"/>
          </div>
        </template>
      </Table>
    </div>
    <base-modal v-model="isModalOpen" @update:isOpen="isModalOpen = $event" title="ویرایش کاربر">
      <template #body>
        <div class="min-w-[700px]">
          bd
        </div>
      </template>
    </base-modal>
  </LayoutOfPages>
</template>
<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import LayoutOfPages from '@/components/Elements/LayoutOfPages.vue';
import Table from '@/components/Elements/Table.vue';
import BaseInput from '@/components/UIKit/baseInput.vue';
import BaseSelect from '@/components/UIKit/baseSelect.vue';
import { fetchData,formatDate,formatDateToJalali ,showErrorToast} from '@/Helpers/helper.ts';
import BaseModal from "@/components/UIKit/baseModal.vue";
import {data} from "autoprefixer";
//import files

const loadingTable = ref<boolean>(false)
const searchInput = ref<string|null>(null)
const isModalOpen = ref<boolean>(false)
// Data reference to store the fetched data
interface IDataTable {
  created_at: string|null
  deleted_at: string|null
  email: string|null
  email_verified_at: string|null
  first_name: string|null
  id: number
  last_name: string|null
  mobile: number
  mobile_verified_at: string|null
  status: number
  updated_at: string|null
  username: string|null
}
const dataTable = ref({
  headers:[
    { title: 'نام', key: 'first_name' },
    { title: 'نام خانوادگی', key: 'last_name' },
    { title: 'موبایل', key: 'mobile' },
    { title: 'ایمیل', key: 'email' },
    { title: 'تاریخ ورود', key: 'created_at' },
    { title: 'تنظیمات', key: 'settings', width:100},
  ],
  data:[],
  loading:false,
  params:{},
  url:'/api/users',
  key:0
})

const items = ref<IDataTable>();

// Function to fetch data from the API
async function getData() {
  loadingTable.value = true
  try {
    const { status, data, message } = await fetchData({
      endpoint: '/api/users',
      method: 'GET',
      params:{
        search:searchInput.value ? searchInput.value : null
      },
      authorization: true
    });
    if (status == 200){
      dataTable.value.data = data.users
      dataTable.value.pagination = data.pagination
      loadingTable.value = false
    }else{
      showErrorToast(message)
      loadingTable.value = false
    }
    // Update the data reference with the fetched data
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}
let deepTime = 0
watch(()=>searchInput.value,()=>{
  if (deepTime) {
    clearTimeout(deepTime);
  }
  deepTime = setTimeout(async () => {
    await getData()
  }, 900);
},{deep:true})
// Fetch data when the component is mounted
onMounted(async () => {
  await getData();
});
</script>