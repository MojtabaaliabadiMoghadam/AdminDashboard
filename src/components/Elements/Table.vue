<template>
  <!-- Table responsive wrapper -->
  <div class="overflow-x-auto bg-white rounded-xl">

    <!-- Table -->
    <table class="min-w-full text-left text-sm whitespace-nowrap">

      <!-- Table head -->
      <thead class="uppercase tracking-wider border-b-2 bg-neutral-50">
      <tr>
        <th v-for="(header,index) in props.headers" :key="index" scope="col" class="px-6 py-5">
          {{ header.title }}
        </th>
      </tr>
      </thead>
      <!-- Table body -->
      <tbody>
      <tr v-for="(item, dataIndex) in props.data" :key="dataIndex" class="border-b hover:bg-neutral-100">
        <td v-for="(header, headerIndex) in props.headers" :key="headerIndex" class="px-6 py-5">
          <slot :name="header.key" :item="item">
            {{ item[header.key] }}
          </slot>
        </td>
      </tr>
      </tbody>

    </table>

  </div>
</template>
<script setup lang="ts">
interface IHeaders {
  title?:string;
  key?:string;
  classTh?:string;
  width?:number
}
interface IPropsData {
  headers?:IHeaders[],
  data?:[],
  url?:string,
  parameters?:string,
  itemKeyRequest?:string
  loading?:boolean
}
const props = defineProps<IPropsData>()
</script>