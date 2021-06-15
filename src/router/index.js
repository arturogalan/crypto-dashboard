import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardView from '/src/views/DashboardView.vue'
import CurrencyDetailView from '/src/views/CurrencyDetailView.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardView,
    },
    {
      path: '/currencies/:cryptoId',
      name: 'CurrencyDetail',
      component: CurrencyDetailView,
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router