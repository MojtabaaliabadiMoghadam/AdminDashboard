<template>
  <LayoutOfPages>
    <template #header>
      <span class="font-bold text-[24px]">لیست فاکتورها</span>
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
        <template #description="{item}" >
          {{ item?.description || 'نامشخص' }}
        </template>
        <template #final_amount="{item}" >
          {{ formatAmount(item?.final_amount) }}
        </template>
        <template #tax_amount="{item}" >
          {{ formatAmount(item?.tax_amount) }}
        </template>
        <template #discount_amount="{item}" >
          {{ formatAmount(item?.discount_amount) }}
        </template>
        <template #payment_date="{item}" >
          {{ formatDate(item?.payment_date) }}
        </template>
        <template #status="{item}" >
          {{ getStatusLabel(item?.status) }}
        </template>
        <template #settings="{item}" >
          <div class="flex gap-2 items-center justify-center">
            <span @click="moreInformation(item)" class="h-10 w-10 rounded-full p-2 hover:bg-red-100 mdi mdi-information mdi-24px text-blue-500 transition-all delay-75 cursor-pointer" />
          </div>
        </template>
      </Table>
    </div>
  </LayoutOfPages>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import LayoutOfPages from '@/components/Elements/LayoutOfPages.vue'
import Table from '@/components/Elements/Table.vue'
import BaseInput from '@/components/UIKit/baseInput.vue'
import { fetchData, showErrorToast } from '@/Helpers/helper.ts'

/* --------------------------------------------------------------------------- */

function moreInformation(item) {
  // Implement more info logic here
}

function formatAmount(amount: number): string {
  return amount ? amount.toFixed(2) : '0.00';
}

function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString('fa-IR', options);
}

function getStatusLabel(status: number): string {
  const STATUS = {
    0: 'در انتظار',
    1: 'پرداخت شده',
    2: 'لغو شده',
  };
  return STATUS[status] || 'نامشخص';
}

interface FactorInterface {
  id: number;
  description: string;
  final_amount: number;
  tax_amount: number;
  discount_amount: number;
  payment_date: string;
  status: number;
  user_creator: number | null;
  user_editor: number | null;
}

const searchInput = ref<string | null>(null);

const dataTable = ref({
  headers: [
    { title: 'توضیحات', key: 'description' },
    { title: 'مبلغ نهایی', key: 'final_amount' },
    { title: 'مبلغ مالیات', key: 'tax_amount' },
    { title: 'مبلغ تخفیف', key: 'discount_amount' },
    { title: 'تاریخ پرداخت', key: 'payment_date' },
    { title: 'وضعیت', key: 'status' },
    { title: 'تنظیمات', key: 'settings', width: 100 },
  ],
  data: [],
  loading: false,
  params: {},
  url: 'api/factors',
  key: 0,
  itemKey: 'factors'
});

async function fetchFactors() {
  dataTable.value.loading = true;
  const { status, data, message } = await fetchData({
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
  // Fetch factors when the component is mounted
  await fetchFactors();
})

</script>

<style scoped>
</style>
