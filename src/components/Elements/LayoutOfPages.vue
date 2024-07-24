<template>
  <div class="h-full w-full">
    <div class="flex flex-col p-8 gap-4">
      <div class="flex">
        <slot name="header" />
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup>
</script>