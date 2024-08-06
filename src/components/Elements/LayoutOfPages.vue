<template>
  <div class="max-h-[calc(100vh-60px)] w-full overflow-auto">
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