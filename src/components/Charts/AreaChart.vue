<template>
  <div class="bg-white py-4 px-2 rounded-2xl" id="chart">
    <VueApexCharts type="area" height="350" :options="chartOptions" :series="series"></VueApexCharts>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// تابع برای تولید داده‌های فیک
function generateFakeData() {
  const data = [];
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const price = Math.random() * 100 + 100; // قیمت بین 100 تا 200
    data.push([date.getTime(), price]);
  }

  return data;
}

// تولید داده‌های فیک
const dates = generateFakeData();

// سری‌های داده‌ها
const series = ref([
  {
    name: 'XYZ MOTORS',
    data: dates,
  },
]);

// تنظیمات چارت
const chartOptions = ref({
  chart: {
    type: 'area',
    stacked: false,
    height: 350,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: 'zoom',
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  title: {
    text: 'Stock Price Movement',
    align: 'left',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  yaxis: {
    labels: {
      formatter: (val) => (val / 1000000).toFixed(0),
    },
    title: {
      text: 'Price',
    },
  },
  xaxis: {
    type: 'datetime',
  },
  tooltip: {
    shared: false,
    y: {
      formatter: (val) => (val / 1000000).toFixed(0),
    },
  },
});
</script>

<style>
/* استایل‌های لازم را اینجا اضافه کنید */
</style>
