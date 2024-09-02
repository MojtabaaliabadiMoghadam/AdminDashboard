<template>
  <layout-of-pages>
    <div class="flex flex-col gap-5">
      <span class="font-bold text-[24px]">ایجاد مقاله </span>
      <ckeditor-blog
          v-model="blog"
      />
      <div class="flex w-full justify-end">
        <button @click="router.back()" type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300
        font-medium rounded-lg text-sm px-10 py-3 me-2 mb-2 ">
          لغو
        </button>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
         font-medium rounded-lg text-sm px-10 py-3 w-[170px] me-2 mb-2 focus:outline-none">
          ثبت
        </button>
      </div>
    </div>
  </layout-of-pages>
</template>
<script setup>
import LayoutOfPages from "@/components/Elements/LayoutOfPages.vue";
import CkeditorBlog from "@/components/Articles/CkeditorBlog.vue";
import {onMounted, ref} from "vue";
import {useBlogStore} from "@/stores/blogStore.ts";
import {useRouter} from "vue-router";
const blogStore = useBlogStore()
const router = useRouter()
//import files
const blog = ref()
//variables
async function submitBlog(){

}
// function checkEditOrCrate(){
//   if ()
// }
//functions
onMounted(()=>{

})
</script>