import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import App from './App.vue'
import store from './store'

// Create a new vue3 instance
const app = createApp(App)
console.log('Server URL: ', process.env.VUE_APP_API_URL)

// Use VueAxios plugin and configure Axios with baseURL and headers
app.use(VueAxios, axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage?.token}`,
    }
}))

// Setup a request interceptor to add the Authorization header with the stored token
app.config.globalProperties.axios.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (err) => {
    return Promise.reject(err);
})

// Setup a response interceptor to handel unauthorized (401) response
app.config.globalProperties.axios.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err?.response?.status === 401) {
        window.location.href = '/auth/login'
    }
    return Promise.reject(err);
})

// Use the Vue Store
app.use(store)

// Use the Vue Router
app.use(router)

app.mount('#app')
