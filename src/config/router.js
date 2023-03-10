import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/OrdersView.vue'),
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const role = to.meta.role
  const isAuthenticated = store.getters.isAuthenticated
  const userRole = store.getters.getCurrentUserRole

  if (requiresAuth) {
    if (!isAuthenticated) {
      next({
        path: '/',
        query: { redirected: true }
      })
    } else if (role !== userRole) {
      // if the user's role is not allowed for the route, redirect to '/'
      next({
        path: '/',
        query: { redirected: true }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router