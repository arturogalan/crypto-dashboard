import { createApp } from 'vue'
import { pinia } from './store'
import App from './App.vue'

const app = createApp(App).use(pinia)

app.mount('#app')
