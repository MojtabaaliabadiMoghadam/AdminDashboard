<template>
  <div class="flex flex-col gap-3 p-4 rounded-2xl bg-white">
    <div class="flex justify-between items-center">
      <div class="flex flex-col gap-3">
        <span class="text-[16px] font-medium text-[#202224]">{{props.text}}</span>
        <span class="text-[28px] font-bold">{{props.price}}</span>
      </div>
      <div
          class=" rounded-3xl flex items-center justify-center h-[60px] w-[60px]"
          :class="[themeBg]"
      >
        <span :class="[props.icon]" class="mdi text-white mdi-36px"></span>
      </div>
    </div>
    <div class="flex items-center gap-1">
      <div class="flex items-center gap-2">
        <span class="text-[#00B69B] mdi-24px mdi mdi-trending-up"></span>
        <span class="text-[#00B69B]">{{props.progressBar.number}}</span>
      </div>
      <span class="font-medium">
        {{props.progressBar.text}}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed} from "vue";

interface IProgressBar {
  text?:string;
  number?:string
}
interface IPropsData{
  text?:string;
  price?:number;
  progressBar?:IProgressBar;
  icon?:string
}
const props = defineProps<IPropsData>()

const themeBg = computed(()=>{
  switch (props.text){
    case 'Total User':
      return 'bg-[#a78bfa]'
    case 'Total Order':
      return 'bg-[#FEC53D]'
    case 'Total Sales':
      return 'bg-[#4AD991]'
    case 'Total Pending':
      return 'bg-[#FF9066]'
  }
})
</script>