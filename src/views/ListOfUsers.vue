<template>
  <LayoutOfPages>
    <template #header>
      <span class="font-bold text-[24px]">List Of Users</span>
    </template>
    <div>
      <Table />
    </div>
  </LayoutOfPages>
</template>
<script setup>
import LayoutOfPages from "@/components/Elements/LayoutOfPages.vue";
import Table from "@/components/Elements/Table.vue";
</script>