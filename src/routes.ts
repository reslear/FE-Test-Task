import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./views/HomeView.vue') },
  { path: '/log-in', component: () => import('./views/LoginView.vue') },
  { path: '/weather', component: () => import('./views/WeatherView.vue') },
  {
    path: '/weather/:city',
    component: () => import('./views/WeatherCityView.vue'),
  },
]
