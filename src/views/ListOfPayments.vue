<template>
  <LayoutOfPages>
    <template #header>
      <span class="font-bold text-[24px]">لیست سوالات متداول</span>
    </template>
    <div class="flex flex-col gap-10">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="inline-flex">
            <base-input label="جستجو" v-model="searchInput" placeholder="جستجو کنید">
              <template #icon>
                <span class="mdi mdi-magnify"/>
              </template>
            </base-input>
          </div>
        </div>
      </div>
      <Table
          :headers="dataTable.headers"
          :url="dataTable.url"
          :parameters="dataTable.params"
          :key="dataTable.key"
          :itemKeyRequest="dataTable.itemKey"
      >
        <template #answer="{item}" >
          {{ truncateText(item?.answer ||'',100) }}
        </template>
        <template #question="{item}" >
          {{ truncateText(item?.question ||'',0) }}
        </template>
        <template #settings="{item}" >
            <div class="flex gap-2 items-center justify-center" >
              <span @click="moreInformation(item)" class="h-10 w-10 rounded-full p-2 hover:bg-red-100 mdi mdi-information mdi-24px text-blue-500 transition-all delay-75 cursor-pointer" />
            </div>
        </template>
      </Table>
    </div>
  </LayoutOfPages>
</template>
<script setup lang='ts'>
import {onMounted, ref, watch} from 'vue'
import LayoutOfPages from '@/components/Elements/LayoutOfPages.vue'
import Table from '@/components/Elements/Table.vue'
import BaseInput from '@/components/UIKit/baseInput.vue'
import {fetchData, showErrorToast, showSuccessToast} from '@/Helpers/helper.ts'

/* --------------------------------------------------------------------------- */

function moreInformation(item){

}

function truncateText(text:string='', length:number=100) {
  if(length ===0){
    return text;
  }

  if (text.length > length) {
    return text.slice(0, length) + '...'; // اگر متن بلندتر از 100 کاراکتر بود، "..." اضافه می‌کنیم
  }
  return text; // در غیر اینصورت، خود متن نمایش داده می‌شود
}

interface FaqInterface {
  id: number;                // Unique identifier
  question: string;         // The question text
  answer: string;           // The answer text
  category: string;         // Category of the FAQ
  status: number;           // Status of the FAQ (use integer for consistency)
  order: number;            // Order of the FAQ in the list
  user_creator: number | null; // ID of the user who created the FAQ
  user_editor: number | null;  // ID of the user who last edited the FAQ
}

// Optional: you can also define the status constants as a separate type if needed
const STATUS = {
  UNKNOWN: 0,
  DISABLE: 1,
  ENABLE: 2,
} as const;

type StatusType = typeof STATUS[keyof typeof STATUS];

const searchInput = ref<string | null>(null);

const dataTable = ref({
  headers: [
    {title: 'سوال', key: 'question'},
    {title: 'پاسخ', key: 'answer'},
    {title: 'تنظیمات', key: 'settings', width: 100},
  ],
  data: [],
  loading: false,
  params: {},
  url: 'api/faqs',
  key: 0,
  itemKey: 'faqs'
});

async function fetchFaqs() {
  dataTable.value.loading = true;
  const {status, data, message} = await fetchData({
    endpoint: dataTable.value.url,
    authorization: true,
  });

  if (status === 200) {
    dataTable.value.data = data;
  } else {
    showErrorToast(message);
  }
}

onMounted(async () => {
  // await fetchFaqs();
})

</script>
<style scoped>
</style>