<template>
<!--  <Dialog v-model:visible="model" modal :showHeader="true" header="Edit Profile"  :pt:root:class="['max-w-7xl']">-->

<!--  </Dialog>-->
  <Dialog v-model:visible="model" modal :showHeader="false" :dismissable-mask="true" pt:root:class="['max-w-7xl']">
    <div class=" sm:p-7 sm:pb-7">
      <div class="flex items-center justify-between">
        <div  @click="handleClose" class="h-10 w-10 flex justify-center rounded-full hover:bg-blue-100 transition-all duration-200 ease-in items-center">
          <span class="mdi mdi-24px mdi-close"></span>
        </div>
        <div class="flex items-center gap-x-1">
          <slot name="before_label"/>
          <h3  class="font-bold text-[24px]">{{ title }}</h3>
          <slot name="extra_label"/>
        </div>
      </div>
    </div>
    <form @submit.prevent="confirmAction">
      <div v-if="$slots.body" class="bg-white px-7 pb-7">
        <div class="ps-4" style="max-height: calc(100vh - 350px)">
          <slot name="body"></slot>
        </div>
      </div>
      <div class=" sm:flex w-full sm:flex-row-reverse justify-end pt-9 pb-7 sm:px-7">
        <slot name="buttons"></slot></div>
    </form>
  </Dialog>
</template>
<script setup lang="ts">
const model = defineModel()
import Dialog from 'primevue/dialog';
const emit = defineEmits(['update:isOpen', 'confirm'])
interface IPropsData{
  title?:string;
}
const props = defineProps<IPropsData>()

const handleClose = () => {
  emit('update:isOpen', false)
}
function confirmAction(){
  emit('confirm')
}
</script>