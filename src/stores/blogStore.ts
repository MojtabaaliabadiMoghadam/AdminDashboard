import {defineStore} from "pinia";
import {ref} from "vue";

export const useBlogStore = defineStore('blog', () => {
    const idBlogSelected = ref<number>()


    return {
        idBlogSelected
    }
})