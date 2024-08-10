import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ListOfUsers from "@/views/ListOfUsers.vue";
import ListOfArticle from "@/views/ListOfArticle.vue";
import Login from "@/views/Login.vue";
import OtpConfirm from "@/views/OtpConfirm.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list-of-users',
      name: 'list-of-users',
      component: ListOfUsers
    },
    {
      path: '/list-of-articles',
      name: 'list-of-articles',
      component: ListOfArticle
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/otp-confirm',
      name: 'otp',
      component: OtpConfirm
    }
  ]
})

export default router
