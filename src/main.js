import './assets/main.css'
import 'ckeditor5/ckeditor5.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.min.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from './router'
import 'vue3-toastify/dist/index.css';
import Select from 'primevue/select';
const app = createApp(App)
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
app.use(createPinia())
app.use(router)
app.use(CkeditorPlugin )
app.component('Select', Select);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
});
app.mount('#app')
