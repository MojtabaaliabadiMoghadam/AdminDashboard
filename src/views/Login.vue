<template>
  <div class="w-full h-[100vh] bg-[#4880FF]">
    <div class="w-full h-[100vh] flex justify-center items-center bg-[url(@/assets/images/Shape.svg)]">
      <!--    <img src="@/assets/images/Shape.svg">-->
      <form @submit.prevent="sendData" class="flex flex-col gap-8 justify-center items-center bg-white py-16 px-10 rounded-2xl">
        <span class="font-bold text-[20px]">Login to Account</span>
        <span class="font-medium">Please enter your phone number to continue</span>
        <div class="inline-flex w-full pb-8">
          <base-input v-model="mobileLogin" label="Phone Number" class-input="w-[300px]"/>
        </div>
        <button class="flex px-24 py-2 bg-[#4880FF] text-white rounded justify-center items-center hover:bg-blue-600 active:bg-blue-700
        transition-all delay-75 ease-out">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseInput from "@/components/UIKit/baseInput.vue";
import {fetchData, showErrorToast, showSuccessToast} from "@/Helpers/helper.ts";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useDataStore} from "@/stores/counter";
const store = useDataStore()
const router = useRouter()
const mobileLogin = ref<number>()
async function sendData() {
  const { status, message } = await fetchData({
    endpoint: '/api/otp',
    method: 'POST',
    data:{
      mobile:mobileLogin.value
    },
    authorization: true
  });
  if (status == 200){
    store.mobile = mobileLogin.value
    showSuccessToast(message)
    setTimeout(async ()=>{
      await router.push('/otp-confirm')
    },700)
  }else{
    showErrorToast(message)
  }
}
</script>