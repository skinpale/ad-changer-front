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
    path: '/client/products',
    name: 'Products',
    component: () => import('@/views/client/ProductsView.vue')
  },
  {
    path: '/client/orders',
    name: 'ClientOrders',
    component: () => import('@/views/client/OrdersView.vue')
  },
  {
    path: '/client/profile',
    name: 'ClientProfile',
    component: () => import('@/views/client/ProfileView.vue')
  },
  {
    path: '/agency/profile',
    name: 'AgencyProfile',
    component: () => import('@/views/agency/ProfileView.vue')
  },
  {
    path: '/agency/orders',
    name: 'Orders',
    component: () => import('@/views/agency/OrdersView.vue')
  },
  {
    path: '/agency/tariffs',
    name: 'AgencyTariffs',
    component: () => import('@/views/agency/TariffView.vue')
  },
  {
    path: '/client/offers',
    name: 'ClientOffers',
    component: () => import('@/views/client/OffersView.vue')
  },
  {
    path: '/agency/clients',
    name: 'AgencyClients',
    component: () => import('@/views/agency/ClientsView.vue')
  },
  {
    path: '/admin/agencies',
    name: 'AdminAgencies',
    component: () => import('@/views/admin/AgenciesView.vue')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router