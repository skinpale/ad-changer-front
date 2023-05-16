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
      // Redirect to '/' only if the current route is not already the home route
      if (to.path !== '/') {
        next({
          path: '/',
          query: { redirected: true }
        })
      }
    } else if (role !== userRole) {
      // if the user's role is not allowed for the route, redirect to '/'
      next({
        path: from,
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