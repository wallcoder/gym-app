import './assets/css/satoshi.css'
import './assets/css/style.css'

import 'flatpickr/dist/flatpickr.min.css'


import { MotionPlugin } from '@vueuse/motion'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import vue3GoogleLogin from 'vue3-google-login';
import App from './App.vue'
import router from './router'
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3000';

// Set default headers
// axios.defaults.headers.common['Authorization'] = 'Bearer YOUR_TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// Set default timeout for requests
axios.defaults.timeout = 10000; // 10 seconds

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.use(MotionPlugin)
app.use(vue3GoogleLogin, {clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID})

app.mount('#app')
