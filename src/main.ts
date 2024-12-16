import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import uiPlugin from '@nuxt/ui/vue-plugin'
import App from './app.vue'
import { routes } from './routes'



const app = createApp(App)

const router = createRouter({
  routes,
  history: createWebHistory()
})

app.use(router)
app.use(uiPlugin)


app.mount('#app')
