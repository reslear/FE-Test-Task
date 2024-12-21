import { createApp } from 'vue'
import uiPlugin from '@nuxt/ui/vue-plugin'
import App from './app.vue'
import { router } from './plugins/router'
import { pinia } from './plugins/pinia'
import { vueQueryPlugin } from './plugins/vue-query'

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(uiPlugin)
  .use(vueQueryPlugin)

app.mount('#app')
