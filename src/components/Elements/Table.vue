<template>
  <!-- Table responsive wrapper -->
  <div class="flex flex-col gap-3">
    <div class="w-[100px]">
      <select v-model="per_page" @change="setPerPage" class="px-5 py-2 rounded-xl focus-visible:outline-none">
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>
    </div>
    <div class="bg-white rounded-xl max-h-[500px] overflow-auto">
      <!-- Table -->
      <table class="min-w-full text-left text-sm whitespace-nowrap">
        <!-- Table head -->
        <thead class="uppercase tracking-wider border-b-2 bg-neutral-50 sticky top-0">
        <tr>
          <th
              v-for="(header, index) in props.headers"
              :key="index"
              scope="col"
              :class="[header.width ? `w-[${header.width}px]` : null]"
              class="px-6 py-5 text-center"
          >
            {{ header.title }}
          </th>
        </tr>
        </thead>
        <!-- Table body -->
        <tbody>
        <!-- Conditional loading spinner inside tbody -->
        <tr v-if="finalLoading">
          <td :colspan="props.headers.length" class="text-center py-10">
            <div role="status" class="flex justify-center items-center">
              <svg
                  aria-hidden="true"
                  class="inline w-10 h-10 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>
        <!-- Table rows -->
        <tr
            v-else
            v-for="(item, dataIndex) in finalData"
            :key="dataIndex"
            class="border-b hover:bg-neutral-100"
        >
          <td
              v-for="(header, headerIndex) in props.headers"
              :key="headerIndex"
              class="px-6 py-2 text-center"
              :class="[header.width ? `w-[${header.width}px]` : null]"
          >
            <slot :name="header.key" :item="item">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="pagination?.total">
      <pagination
          :model-value="pagination.current_page"
          :per-page="pagination.per_page"
          :total="pagination.total"
          @update:modelValue="setCurrentPage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Pagination from '@/components/UIKit/pagination.vue';
import { fetchData, showErrorToast } from '@/Helpers/helper';

interface IHeaders {
  title?: string;
  key?: string;
  classTh?: string;
  width?: number;
}

interface IPagination {
  total?: number;
  per_page?: number;
  current_page?: number;
}

interface IPropsData {
  headers?: IHeaders[];
  data?: [];
  url?: string;
  parameters?: string;
  itemKeyRequest?: string;
  loading?: boolean;
  pagination?: IPagination;
}

const props = defineProps<IPropsData>();
const loadingTable = ref<boolean>(false);
const per_page = ref<number>(10);  // Default value is set to 10
const DataFromBackend = ref();
const pagination = ref<IPagination>();

// Fetch data
async function getDataWithUrl() {
  loadingTable.value = true;
  try {
    const { status, data, message } = await fetchData({
      endpoint: props.url,
      method: 'GET',
      params: {
        ...props.parameters,
        page: pagination.value?.current_page,
        per_page: per_page.value,
      },
      authorization: true,
    });

    if (status == 200) {
      DataFromBackend.value = data[props.itemKeyRequest];
      pagination.value = data.pagination;
    } else {
      showErrorToast(message);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    loadingTable.value = false;
  }
}

const finalData = computed(() => (props.url ? DataFromBackend.value : props.data));
const finalLoading = computed(() => (props.url ? loadingTable.value : props.loading));

onMounted(async () => {
  await getDataWithUrl();
});

async function setCurrentPage(event) {
  pagination.value.current_page = event;
  console.log(pagination.value.current_page)
  await getDataWithUrl();
}

async function setPerPage(event: Event) {
  const target = event.target as HTMLSelectElement;
  per_page.value = parseInt(target.value);
  await getDataWithUrl();
}
</script>
