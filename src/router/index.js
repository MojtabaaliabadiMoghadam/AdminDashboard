import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import ListOfUsers from "@/views/ListOfUsers.vue"
import ListOfLotteryUsers from "@/views/ListOfLotteryUsers.vue"
import ListOfArticle from "@/views/Blogs/ListOfArticle.vue"
import Login from "@/views/Login.vue"
import OtpConfirm from "@/views/OtpConfirm.vue"
import CreateBlog from '@/views/Blogs/CreateEditBlog.vue'
import ListOfFaqs from "@/views/ListOfFaqs.vue"
import ListOfPayments from "@/views/ListOfPayments.vue"
import ListOfFactors from "@/views/ListOfFactors.vue"

// ایجاد router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: [
        {
            path: '/api/admin/dashboard',
            name: 'dashboard',
            component: Home,
            meta: {requiresAuth: true}
        },
        {
            path: '/api/admin/list-of-users',
            name: 'list-of-users',
            component: ListOfUsers,
            meta: {requiresAuth: true}
        },
        {
            path: '/api/admin/list-of-lottery-users',
            name: 'list-of-lottery-users',
            component: ListOfLotteryUsers,
            meta: {requiresAuth: true}
        },
        {
            path: '/api/admin/list-of-faqs',
            name: 'list-of-faqs',
            component: ListOfFaqs,
            meta: {requiresAuth: true}
        },
        {
            path: '/api/admin/list-of-factors',
            name: 'list-of-factors',
            component: ListOfFactors,
            meta: {requiresAuth: true}
        },
        {
            path: '/api/admin/list-of-payments',
            name: 'list-of-payments',
            component: ListOfPayments,
            meta: {requiresAuth: true}
        },
        {
            path: '/api/admin/list-of-articles',
            name: 'list-of-articles',
            component: ListOfArticle,
            meta: {requiresAuth: true}
        },
        {
            path: '/api/admin/create-blog',
            name: 'create-blog',
            component: CreateBlog,
            meta: {requiresAuth: true}
        },
        {
            path: '/login/otp',
            name: 'login',
            component: Login
        },
        {
            path: '/login/otp-confirm',
            name: 'otp',
            component: OtpConfirm
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/admin/dashboard'
        }
    ]
});

// middleware برای چک کردن ورود
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('authorization'); // چک کردن وضعیت ورود

    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        // اگر نیاز به احراز هویت دارد و کاربر وارد نشده
        next('/login/otp'); // کاربر به صفحه ورود هدایت می‌شود
    } else {
        next(); // اجازه عبور
    }
});

export default router
