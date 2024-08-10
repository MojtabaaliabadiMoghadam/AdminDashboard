<template>
  <div class="w-full h-[100vh] bg-[#4880FF]">
    <div class="w-full h-[100vh] flex justify-center items-center bg-[url(@/assets/images/Shape.svg)]">
      <!--    <img src="@/assets/images/Shape.svg">-->
      <form @submit.prevent="sendOTPData" class="flex flex-col gap-8 justify-center items-center bg-white py-16 px-10 rounded-2xl">
        <span class="font-bold text-[20px]">Verify</span>
        <span class="font-medium">Your Code was Send To your Phone Number</span>
        <div class="inline-flex w-full pb-8">
          <base-input v-model="otpConfirm" type="password" class-input="w-[300px]"/>
        </div>
        <button class="flex px-24 py-2 bg-[#4880FF] text-white rounded justify-center items-center hover:bg-blue-600 active:bg-blue-700
        transition-all delay-75 ease-out">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseInput from "@/components/UIKit/baseInput.vue";
import {ref} from "vue";
import {fetchData, showErrorToast, showSuccessToast} from "@/Helpers/helper";
import {useDataStore} from "@/stores/counter";
import {useRouter} from "vue-router";
const router = useRouter()
const otpConfirm = ref<number>()
const store = useDataStore()
async function sendOTPData() {
  const { status, message } = await fetchData({
    endpoint: '/api/otp-confirm',
    method: 'POST',
    data:{
      mobile:store.mobile,
      code:otpConfirm.value
    },
    authorization: true
  });
  if (status == 200){
    showSuccessToast(message)
    localStorage.setItem('authorization',{mobile:store.mobile})
    await router.push('/otp-confirm')
  }else{
    showErrorToast(message)
  }
}
</script>