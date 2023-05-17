import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductsView.vue')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router