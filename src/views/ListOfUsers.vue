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
import LayoutOfPages from "@/components/Elements/LayoutOfPages.vue";
import Table from "@/components/Elements/Table.vue";
import {ref} from "vue";
import BaseInput from "@/components/UIKit/baseInput.vue";
import BaseSelect from "@/components/UIKit/baseSelect.vue";
const headers = ref([
  {title:'id',key:'id'},
  {title:'name',key:'name'},
  {title:'status',key:'status'},
  {title:'number',key:'number'},
  {title:'date',key:'date'},
])
const data = ref([
  { id: 1, name: 'hosein alipor', status: 'member', number: '09151112333', date: '1403/07/22' },
  { id: 2, name: 'ali rezaei', status: 'admin', number: '09151112334', date: '1403/07/23' },
  { id: 3, name: 'zahra ahmadi', status: 'guest', number: '09151112335', date: '1403/07/24' },
  { id: 4, name: 'mohammad ghasemi', status: 'member', number: '09151112336', date: '1403/07/25' },
  { id: 5, name: 'fatemeh jalili', status: 'guest', number: '09151112337', date: '1403/07/26' },
  { id: 6, name: 'sara karimi', status: 'admin', number: '09151112338', date: '1403/07/27' },
  { id: 7, name: 'reza moradi', status: 'member', number: '09151112339', date: '1403/07/28' }
])
</script>