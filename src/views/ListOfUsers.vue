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
          <BaseSelect
              :label="formItems.status.label"
              :localOptions="formItems.status.localOptions"
              :optionValue="formItems.status.optionValue"
              :optionText="formItems.status.optionText"
              @update:optionSelected="(event)=> status = event"
              :place_holder="formItems.status.place_holder"
              :size="formItems.status.size"
          />
        </div>
      </div>
      <Table
          :headers="dataTable.headers"
          :url="dataTable.url"
          :parameters="dataTable.params"
          :key="dataTable.key"
          :itemKeyRequest="dataTable.itemKey"
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
        <div class="min-w-[700px] flex">
          <div dir="rtl" class="w-full grid grid-cols-8 gap-3">
            <div class="col-span-2">
              <base-input :label="formItems.name.label" v-model="searchInput" :placeholder="formItems.name.place_holder" />
            </div>
            <div class="col-span-2">
              <base-input :label="formItems.last_name.label" v-model="searchInput" :placeholder="formItems.last_name.place_holder" />
            </div>
            <div class="col-span-2">
              <base-input :label="formItems.mobile.label" v-model="searchInput" :placeholder="formItems.mobile.place_holder" />
            </div>
          </div>
        </div>
      </template>
      <template #buttons>
        <button type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300
        font-medium rounded-lg text-sm px-10 py-3 me-2 mb-2 ">
          لغو
        </button>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
         font-medium rounded-lg text-sm px-10 py-3 w-[170px] me-2 mb-2 focus:outline-none">
          ثبت
        </button>

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
const status = ref<number>()
//import files

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
  key:0,
  itemKey:'users'
})
const formItems = ref({
  status:{
    label:"وضعیت",
    localOptions:[{ id: 1, name: 'فعال' }, { id: 0, name: 'غیر فعال' }],
    optionValue:"id",
    optionText:"name",
    place_holder:"",
    size:"!w-[200px]"
  },
  name:{
    label:'نام',
    place_holder:''
  },
  last_name:{
    label:'نام خانوادگی',
    place_holder:''
  },
  mobile:{
    label:'موبایل',
    place_holder:''
  },
})
const items = ref<IDataTable>();

// Function to fetch data from the API

let deepTime = 0
watch(()=>searchInput.value,()=>{
  if (deepTime) {
    clearTimeout(deepTime);
  }
  deepTime = setTimeout(async () => {
    dataTable.value.params = {
      search:searchInput.value
    }
     dataTable.value.key ++
  }, 900);
},{deep:true})
watch(()=>status.value,()=>{
  dataTable.value.params = {...dataTable.value.params,status:status.value}
  dataTable.value.key ++
},{deep:true})
</script>