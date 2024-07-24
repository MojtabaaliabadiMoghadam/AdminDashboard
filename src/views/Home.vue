<template>
  <LayoutOfPages>
    <template #header>
      <span class="font-bold text-[26px]">Dashboard</span>
    </template>
    <div class="grid grid-cols-4 gap-10">
      <div v-for="(item,index) in listsOfDataCard" :key="index" class="col-span-1">
        <BoxStatus :text="item.title" :icon="item.icon" :price="item.value" :progressBar="item.progress_status"/>
      </div>
    </div>
    <AreaChart />
  </LayoutOfPages>
</template>
<script setup>
import BoxStatus from '@/components/Elements/BoxStatus.vue'
import {ref} from "vue";
import AreaChart from "@/components/Charts/AreaChart.vue";
import LayoutOfPages from "@/components/Elements/LayoutOfPages.vue";

//data for box card analyzer
const listsOfDataCard = ref([
  {title:'Total User', value:40689 ,icon:'mdi-account-group-outline' ,progress_status:{text:'Up from yesterday',number:'8.5%'}},
  {title:'Total Order', value:10293 , icon:'mdi-google-analytics', progress_status:{text:'Up from past we',number:'1.3%'}},
  {title:'Total Sales', value:89000 , icon:'mdi-home-analytics',  progress_status:{text:'Down from yesterday',number:'4.3%'}},
  {title:'Total Pending', value:2040 , icon:'mdi-timer-check-outline',  progress_status:{text:'Up from yesterday',number:'1.8%'}},
])
</script>