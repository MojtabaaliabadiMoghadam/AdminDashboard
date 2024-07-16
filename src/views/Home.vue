<template>
  <div class="h-full w-full bg-[#EDEEF3]">
    <div class="flex flex-col p-8 gap-4">
      <span class="font-bold text-[26px]">Dashboard</span>
      <div class="grid grid-cols-4">
        <BoxStatus />
      </div>
    </div>
  </div>
</template>
<script setup>
import BoxStatus from '@/components/Elements/BoxStatus.vue'
</script>