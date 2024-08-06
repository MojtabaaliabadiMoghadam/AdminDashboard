<template>
  <Button label="Show" @click="visible = true" >vds</Button>
  <Dialog v-model:visible="visible" modal :showHeader="false" :dismissable-mask="true" :pt:root:class="[size,'w-full']">
    vsd
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import {ref} from "vue";
const visible = ref()
</script>