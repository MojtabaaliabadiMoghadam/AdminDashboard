<template>
  <nav aria-label="Page navigation example">
    <ul class="flex items-center justify-center h-10 text-base">
      <li>
        <a
            href="#"
            @click.prevent="prevPage"
            :class="[
            'flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700',
            { 'cursor-not-allowed opacity-50': isFirstPage }
          ]"
            :aria-disabled="isFirstPage"
        >
          <span class="sr-only">Previous</span>
          <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
          </svg>
        </a>
      </li>
      <li v-for="page in totalPages" :key="page">
        <a
            href="#"
            @click.prevent="selectPage(page)"
            :class="[
            'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
            { 'font-bold text-blue-500 bg-gray-300': page === currentPage }
          ]"
        >
          {{ page }}
        </a>
      </li>
      <li>
        <a
            href="#"
            @click.prevent="nextPage"
            :class="[
            'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700',
            { 'cursor-not-allowed opacity-50': isLastPage }
          ]"
            :aria-disabled="isLastPage"
        >
          <span class="sr-only">Next</span>
          <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const totalPages = computed(() => {
  const pages = Math.ceil(props.total / props.perPage);

  return pages > 0 ? pages : 1;
});
const currentPage = computed(() => props.modelValue);

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const selectPage = (page) => {
  emit('update:modelValue', page);
};

const prevPage = () => {
  if (!isFirstPage.value) {
    emit('update:modelValue', currentPage.value - 1);
  }
};

const nextPage = () => {
  if (!isLastPage.value) {
    emit('update:modelValue', currentPage.value + 1);
  }
};
</script>

