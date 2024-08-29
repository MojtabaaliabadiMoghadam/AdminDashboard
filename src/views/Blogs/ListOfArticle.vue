<template>
  <LayoutOfPages>
    <template #header>
      <span class="font-bold text-[24px]">لیست مقالات</span>
    </template>
    <div class="flex flex-col gap-10">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="inline-flex">
            <base-input label="جستجو" v-model="searchInput" placeholder="جستجو کنید">
              <template #icon>
                <span class="mdi mdi-magnify" />
              </template>
            </base-input>
          </div>
          <div class="">
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
        </div>
        <div class="flex justify-end">
          <button @click="router.push('/admin/create-blog')" type="button" class="text-blue-700 flex items-center gap-3 font-bold hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4
          focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-10 py-3 text-center mdi mdi-plus mdi-24px">
            ایجاد مقاله
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
            <span @click="moveToPageBlogForEdit(item.id)" class="h-10 w-10  rounded-full p-2 hover:bg-blue-100 mdi mdi-cog mdi-24px text-blue-500 transition-all
             delay-75 cursor-pointer"/>
            <span @click="openModalRemove(item.id)" class="h-10 w-10  rounded-full p-2 hover:bg-red-100 mdi mdi-delete-outline mdi-24px text-red-500 transition-all
             delay-75 cursor-pointer"/>
          </div>
        </template>
      </Table>
    </div>
    <base-modal @confirm="updateUser" v-model="isModalRemoveOpen" @update:isOpen="isModalRemoveOpen = $event" title="حذف مقاله">
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
import {ref, watch} from 'vue';
import LayoutOfPages from '@/components/Elements/LayoutOfPages.vue';
import Table from '@/components/Elements/Table.vue';
import BaseInput from '@/components/UIKit/baseInput.vue';
import BaseSelect from '@/components/UIKit/baseSelect.vue';
import {fetchData, formatDate, showErrorToast, showSuccessToast} from '@/Helpers/helper.ts';
import BaseModal from "@/components/UIKit/baseModal.vue";
import CkeditorBlog from "@/components/Articles/CkeditorBlog.vue";
import {useRouter} from "vue-router";
import {useBlogStore} from "@/stores/blogStore";
const blogStore = useBlogStore()
//variables
const router = useRouter()
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
    { title: 'موضوع مقاله', key: 'last_name' },
    { title: 'تاریخ ثبت', key: 'mobile' },
    { title: 'وضعیت مقاله', key: 'email' },
    { title: 'تنظیمات', key: 'settings', width:100},
  ],
  data:[],
  loading:false,
  params:{},
  url:'/api/blog',
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
function moveToPageBlogForEdit(id){
  blogStore.idBlogSelected = id
  loadingGetDataUser.value = true
   router.push('/admin/create-blog')
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