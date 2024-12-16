import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import uiPlugin from '@nuxt/ui/vue-plugin'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './app.vue'
import { routes } from './routes'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const router = createRouter({
  routes,
  history: createWebHistory(),
})
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(uiPlugin)

app.mount('#app')
