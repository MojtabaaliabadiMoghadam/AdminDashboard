<template>
  <LayoutOfPages>
    <template #header>
      <span class="font-bold text-[24px]">لیست کاربران</span>
    </template>
    <div class="flex flex-col gap-10">
      <div class="grid grid-cols-12 items-center">
        <div class="inline-flex lg:col-span-3 md:col-span-4 sm:col-span-6">
          <base-input label="جستجو" v-model="searchInput" placeholder="جستجو کنید">
            <template #icon>
              <span class="mdi mdi-magnify" />
            </template>
          </base-input>
        </div>
        <div class="lg:col-span-3 md:col-span-4 sm:col-span-6">
          <BaseSelect
              v-model="status"
              :label="formItems.status.label"
              :optionValue="formItems.status.optionValue"
              :optionText="formItems.status.optionText"
              :localOptions="formItems.status.localOptions"
              :place_holder="formItems.status.place_holder"
              :size="formItems.status.size"
          />
        </div>
        <div class="md:col-span-6 sm:col-span-12 flex justify-end ">
          <button @click="isModalCreate = true" type="button" class="text-blue-700 font-bold hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4
          focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-10 py-3 text-center me-2 mb-2">
            ایجاد کاربر
          </button>
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
        <template #settings="{item}">
          <div class="flex gap-2 items-center justify-center">
            <span @click="getDataUser(item.id)" class="h-10 w-10  rounded-full p-2 hover:bg-blue-100 mdi mdi-cog mdi-24px text-blue-500 transition-all
             delay-75 cursor-pointer"/>
            <span @click="openModalRemove(item.id)" class="h-10 w-10  rounded-full p-2 hover:bg-red-100 mdi mdi-delete-outline mdi-24px text-red-500 transition-all
             delay-75 cursor-pointer"/>
          </div>
        </template>
      </Table>
    </div>
    <base-modal @confirm="updateUser" v-model="isModalCreate" @update:isOpen="isModalCreate = $event" title="ایجاد کاربر">
      <template #body>
        <div class="min-w-[988px] flex">
          <div v-if="loadingGetDataUser" class="w-full flex justify-center">
            <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else dir="rtl" class="w-full grid grid-cols-8 gap-3">
            <div class="col-span-2">
              <base-input :label="formItems.name.label" v-model="formDataCreate.first_name" :placeholder="formItems.name.place_holder" />
            </div>
            <div class="col-span-2">
              <base-input :label="formItems.last_name.label" v-model="formDataCreate.last_name" :placeholder="formItems.last_name.place_holder" />
            </div>
            <div class="col-span-2">
              <base-input :label="formItems.username.label" v-model="formDataCreate.username" :placeholder="formItems.mobile.place_holder" />
            </div>
            <div class="col-span-2">
              <base-input :label="formItems.password.label" v-model="formDataCreate.password" :placeholder="formItems.mobile.place_holder" />
            </div>
            <div class="col-span-2">
              <base-input :label="formItems.mobile.label" v-model="formDataCreate.mobile" :placeholder="formItems.mobile.place_holder" />
            </div>
            <div class="col-span-2">
              <base-input :label="formItems.email.label" v-model="formDataCreate.email" :placeholder="formItems.mobile.place_holder" />
            </div>
          </div>
        </div>
      </template>
      <template v-if="!loadingGetDataUser" #buttons>
        <button @click="isModalCreate = false" type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300
        font-medium rounded-lg text-sm px-10 py-3 me-2 mb-2 ">
          لغو
        </button>
        <button @click="addNewUser" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
         font-medium rounded-lg text-sm px-10 py-3 w-[170px] me-2 mb-2 focus:outline-none">
          ایجاد کاربر
        </button>
      </template>
    </base-modal>
    <base-modal @confirm="updateUser" v-model="isModalOpen" @update:isOpen="isModalOpen = $event" title="ویرایش کاربر">
      <template #body>
        <div class="min-w-[988px] flex">
          <div v-if="loadingGetDataUser" class="w-full flex justify-center">
            <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else dir="rtl" class="w-full grid grid-cols-8 gap-3">
            <div class="col-span-2">
              <base-input :label="formItems.name.label" v-model="dataUser.first_name" :placeholder="formItems.name.place_holder" />
            </div>
            <div class="col-span-2">
              <base-input :label="formItems.last_name.label" v-model="dataUser.last_name" :placeholder="formItems.last_name.place_holder" />
            </div>
            <div class="col-span-2">
              <base-input :label="formItems.mobile.label" v-model="dataUser.mobile" :placeholder="formItems.mobile.place_holder" />
            </div>
          </div>
        </div>
      </template>
      <template v-if="!loadingGetDataUser" #buttons>
        <button @click="isModalOpen = false" type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300
        font-medium rounded-lg text-sm px-10 py-3 me-2 mb-2 ">
          لغو
        </button>
        <button @click="updateUser" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
         font-medium rounded-lg text-sm px-10 py-3 w-[170px] me-2 mb-2 focus:outline-none">
          ثبت
        </button>
      </template>
    </base-modal>
    <base-modal @confirm="updateUser" v-model="isModalRemoveOpen" @update:isOpen="isModalRemoveOpen = $event" title="حذف کاربر">
      <template #body>
        <div class="min-w-[400px] flex">
          <span class="text-[18px] font-medium flex w-full justify-end">
            آیا مطمعن هستید میخواهید این کاربر را حذف کنید؟
          </span>
        </div>
      </template>
      <template v-if="!loadingGetDataUser" #buttons>
        <button @click="isModalRemoveOpen = false" type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300
        font-medium rounded-lg text-sm px-10 py-3 me-2 mb-2 ">
          لغو
        </button>
        <button @click="removeDataUser" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
         font-medium rounded-lg text-sm px-10 py-3 w-[170px] me-2 mb-2 focus:outline-none">
          حذف شود
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
import {fetchData, formatDate, formatDateToJalali, showErrorToast, showSuccessToast} from '@/Helpers/helper.ts';
import BaseModal from "@/components/UIKit/baseModal.vue";
const status = ref<number>(1)
const dataUser = ref({})
const loadingGetDataUser = ref<boolean>(false)
const searchInput = ref<string|null>(null)
const isModalCreate = ref<boolean>(false)
const isModalRemoveOpen = ref<boolean>(false)
const isModalOpen = ref<boolean>(false)
const idUserClicked = ref()
interface IFormDataCreate {
  first_name: string,
  last_name: string,
  username: string,
  password: string,
  mobile: string,
  email: string,
  status: number
}
const defaultDataCreate = {
  first_name: '',
  last_name: '',
  username: '',
  password: '',
  mobile: '',
  email: '',
  status: 0
}
const formDataCreate = ref<IFormDataCreate>(defaultDataCreate)
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
  params:{status:status.value},
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
  username:{
    label:'نام کاربری',
    place_holder:''
  },
  password:{
    label:'رمز عبور',
    place_holder:''
  },
  email:{
    label:'ایمیل',
    place_holder:''
  },
})
const items = ref<IDataTable>();
async function getDataUser(id){
  idUserClicked.value = id
  loadingGetDataUser.value = true
  isModalOpen.value = true
  let url_ = `/api/users/${idUserClicked.value}`
   const { status, data, message } = await fetchData({
    endpoint:url_,
    authorization: true,
  })
  if (status == 200){
    dataUser.value = data
    loadingGetDataUser.value = false
  }else{
    showErrorToast(message)
  }
}
function openModalRemove(id){
  idUserClicked.value = id
  isModalRemoveOpen.value = true
}
async function addNewUser(){
  let url_ = `/api/users`
  const {status, message } = await fetchData({
    endpoint:url_,
    authorization: true,
    method:'POST',
    data:formDataCreate.value
  })
  console.log(status)
  if (status == 201){
    isModalCreate.value = false
    showSuccessToast(message)
    dataTable.value.key ++
    formDataCreate.value = defaultDataCreate
  }else{
    isModalCreate.value = false
    showErrorToast(message)
    formDataCreate.value = defaultDataCreate
  }
}
async function removeDataUser(){
  isModalRemoveOpen.value = true
  let url_ = `/api/users/${idUserClicked.value}`
  const { status, message } = await fetchData({
    endpoint:url_,
    method:'DELETE',
    authorization: true,
  })
  if (status == 200){
    isModalRemoveOpen.value = false
    dataTable.value.key ++
    showSuccessToast(message)
  }else{
    isModalRemoveOpen.value = false
    showErrorToast(message)
  }
}
async function updateUser(){
  loadingGetDataUser.value = true
  let url_ = `/api/users/${idUserClicked.value}`
  const { status , message } = await fetchData({
    endpoint:url_,
    method:'PUT',
    data:dataUser.value,
    authorization: true,
  })
  if (status == 200){
    showSuccessToast(message)
    loadingGetDataUser.value = false
    isModalOpen.value = false
    dataTable.value.key ++
  }else{
    showErrorToast(message)
  }
}

let deepTime = 0
watch(()=>searchInput.value,()=>{
  if (deepTime) {
    clearTimeout(deepTime);
  }
  deepTime = setTimeout(async () => {
    (dataTable.value.params as UnwrapRef<{search: string}>).search = searchInput.value;
     dataTable.value.key ++
  }, 900);
},{deep:true})
watch(()=>status.value,()=>{
  dataTable.value.params = {...dataTable.value.params,status:status.value}
  dataTable.value.key ++
},{deep:true})
</script>