import { createApp } from 'vue'
import { pinia } from './store'
import App from './App.vue'
import './index.css'
import router from "./router/index"

const app = createApp(App).use(pinia).use(router)

app.mount('#app')
