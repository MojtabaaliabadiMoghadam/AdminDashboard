<template>
  <div class="flex flex-col gap-1">
    <label v-if="props.label" class="text-[16px] font-medium ps-1">
      {{props.label}}
    </label>
    <Select :loading="props.loading" :disabled="props.disabled" v-model="model" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
  </div>

</template>
<script setup lang="ts">
const model = defineModel()
import Select from 'primevue/select';
interface IPropsData {
  label?:string;
  loading?:boolean;
  disabled?:boolean
}
const props = withDefaults(defineProps<IPropsData>(),{
  loading:false,
  disabled:false
})
</script>