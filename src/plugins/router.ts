import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import { useAuthStore } from '../stores/authStore'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/weather' },
  { path: '/login', component: () => import('../views/LoginView.vue') },
  {
    path: '/weather',
    component: () => import('../views/WeatherView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/weather/:city',
    component: () => import('../views/WeatherCityView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
]

export const router = createRouter({
  routes,
  // hash mode for Github Pages
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

router.beforeEach(async (to) => {
  const { isLoggedIn } = useAuthStore()

  if (
    to.meta.requiresAuth &&
    // make sure the user is authenticated
    !isLoggedIn() &&
    // ❗️ Avoid an infinite redirect
    to.path !== '/login'
  ) {
    // redirect the user to the login page
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

declare module 'vue-router' {
  interface RouteMeta {
    // must be declared by every route
    requiresAuth?: boolean
  }
}
