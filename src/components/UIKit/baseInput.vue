<template>
  <div class="flex flex-col gap-1">
    <label v-if="props.label" class="text-[16px] font-medium ps-1">
       {{props.label}}
    </label>
    <div class="relative">
      <InputText :class="props.classInput" :type="props.type"  v-model="model" />
      <div class="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
        <slot name="icon"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext';
const model = defineModel()
interface IPropsData {
  label?:string;
  classLabel?:string;
  classInput?:string;
  type?:string
}
const props = withDefaults(defineProps<IPropsData>(),{
  type:'text'
})
</script>