<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-[16px] font-medium ps-1">
      {{ label }}
    </label>
    <Select
        :loading="loading"
        :disabled="disabled"
        v-model="model"
        :options="options"
        :optionLabel="optionText"
        :optionValue="optionValue"
        :placeholder="place_holder"
        class="w-full"
        :class="[size]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Select from 'primevue/select';

interface IPropsData {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  place_holder?: string;
  size?: string;
  url?: string;
  optionValue: string;
  optionText: string;
  localOptions?: Array<{ [key: string]: any }>;  // Adding local options prop
}
const emit = defineEmits(['update:optionSelected'])
const props = withDefaults(defineProps<IPropsData>(), {
  loading: false,
  disabled: false,
  size: 'w-56'
});

const model = defineModel();
const options = ref(props.localOptions);  // Start with local options if provided

const fetchData = async () => {
  if (props.url) {
    try {
      const response = await fetch(props.url);
      const data = await response.json();

      // Assuming the data is an array of objects, map them to the required structure
      const fetchedOptions = data.map((item: any) => ({
        ...item,
        label: item[props.optionText],  // Used by PrimeVue's optionLabel prop
        value: item[props.optionValue]  // Manually manage the value here
      }));

      // Combine local options with fetched options
      options.value = [...props.localOptions, ...fetchedOptions];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};
watch(()=>model,()=>{
  emit('update:optionSelected',model.value.id)
},{deep:true})
onMounted(async () => {
  await fetchData();
});
</script>
