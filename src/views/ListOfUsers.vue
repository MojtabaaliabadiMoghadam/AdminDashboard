<template>
  <LayoutOfPages>
    <template #header>
      <span class="font-bold text-[24px]">List Of Users</span>
    </template>
    <div class="flex flex-col gap-3">
      <div class="grid grid-cols-12 items-center">
        <div class="inline-flex col-span-2">
          <base-input label="Search">
            <template #icon>
              <span class="mdi mdi-magnify" />
            </template>
          </base-input>
        </div>
        <div class="col-span-2">
          <base-select label="select box"/>
        </div>
      </div>
      <Table
          :headers="headers"
          :data="data"
      >
        <template #id="{item}">
          <div class="font-bold">
            {{item.id}}
          </div>
        </template>
      </Table>
    </div>
  </LayoutOfPages>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import LayoutOfPages from '@/components/Elements/LayoutOfPages.vue';
import Table from '@/components/Elements/Table.vue';
import BaseInput from '@/components/UIKit/baseInput.vue';
import BaseSelect from '@/components/UIKit/baseSelect.vue';
import { fetchData } from '@/Helpers/helper.ts';

// Define the headers for the table
const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  // Add other headers as needed
];

// Data reference to store the fetched data
const data = ref([]);

// Function to fetch data from the API
async function getData() {
  try {
    const { status, data: responseData, message } = await fetchData({
      endpoint: '/api/users',
      method: 'GET',
      authorization: true // Use authorization if needed
    });
    console.log('status', status);
    console.log('data', responseData);
    console.log('message', message);

    // Update the data reference with the fetched data
    data.value = responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

// Fetch data when the component is mounted
onMounted(async () => {
  await getData();
});
</script>