import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// set an axios interceptor that adds the token to the Authorization header
axios.interceptors.request.use((config) => {
    // get the token from local storage
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axios.defaults.baseURL = 'http://localhost:3000/'

app.mount('#app')
