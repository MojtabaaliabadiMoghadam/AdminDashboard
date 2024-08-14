<template>
  <div class="w-full h-[100vh] bg-[#4880FF]">
    <div class="w-full h-[100vh] flex justify-center items-center bg-[url(@/assets/images/Shape.svg)]">
      <!--    <img src="@/assets/images/Shape.svg">-->
      <form @submit.prevent="sendOTPData" class="flex flex-col gap-8 justify-center items-center bg-white py-16 px-10 rounded-2xl">
        <span class="font-bold text-[20px]">احراز هویت</span>
        <span class="font-medium">کد ورود به تلفن شما ارسال شد</span>
        <div class="inline-flex w-full pb-8">
          <base-input v-model="otpConfirm" type="number" class-input="w-[300px]"/>
        </div>
        <button class="flex px-24 py-2 bg-[#4880FF] text-white rounded justify-center items-center hover:bg-blue-600 active:bg-blue-700
        transition-all delay-75 ease-out">
          ورود
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseInput from "@/components/UIKit/baseInput.vue";
import { ref } from "vue";
import { fetchData, showErrorToast, showSuccessToast } from "@/Helpers/helper";
import { useDataStore } from "@/stores/store.ts"; // استفاده از store داده‌ها
import { useRouter } from "vue-router";

const router = useRouter();
const otpConfirm = ref<number>();
const store = useDataStore();

async function sendOTPData() {
  const { status, message, data } = await fetchData({
    endpoint: '/api/otp-confirm',
    method: 'POST',
    data: {
      mobile: store.mobile, // استفاده از موبایل از store
      code: otpConfirm.value,
    },
    authorization: true
  });

  if (status == 200) {
    console.log(data, 'data');
    showSuccessToast(message);
    store.setToken(data?.token); // به‌روزرسانی توکن در store
    await router.push('/admin/dashboard');
  } else {
    showErrorToast(message);
  }
}
</script>