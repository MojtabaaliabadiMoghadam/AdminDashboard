import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ListOfUsers from "@/views/ListOfUsers.vue";
import ListOfArticle from "@/views/ListOfArticle.vue";
import Login from "@/views/Login.vue";
import OtpConfirm from "@/views/OtpConfirm.vue";
// ایجاد router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true } // مشخص کردن نیاز به احراز هویت
    },
    {
      path: '/list-of-users',
      name: 'list-of-users',
      component: ListOfUsers,
      meta: { requiresAuth: true } // مشخص کردن نیاز به احراز هویت
    },
    {
      path: '/list-of-articles',
      name: 'list-of-articles',
      component: ListOfArticle,
      meta: { requiresAuth: true } // مشخص کردن نیاز به احراز هویت
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
});

// middleware برای چک کردن ورود
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('authorization'); // چک کردن وضعیت ورود

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    // اگر نیاز به احراز هویت دارد و کاربر وارد نشده
    next('/login'); // کاربر به صفحه ورود هدایت می‌شود
  } else {
    next(); // اجازه عبور
  }
});

export default router
