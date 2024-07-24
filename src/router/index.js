import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ListOfUsers from "@/views/ListOfUsers.vue";
import ListOfArticle from "@/views/ListOfArticle.vue";
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
    }
  ]
})

export default router
