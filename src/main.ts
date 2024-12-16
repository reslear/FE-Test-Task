import { createApp } from 'vue'
import uiPlugin from '@nuxt/ui/vue-plugin'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './app.vue'
import { router } from './plugins/router'
import { pinia } from './plugins/pinia'

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(uiPlugin)
  .use(VueQueryPlugin, {
    enableDevtoolsV6Plugin: true,
  })

app.mount('#app')
