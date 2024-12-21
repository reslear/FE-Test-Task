import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { experimental_createPersister } from '@tanstack/query-persist-client-core'
import type { Plugin } from 'vue'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      persister: experimental_createPersister({
        storage: localStorage,
      }),
    },
  },
})

export const vueQueryPlugin = {
  install: (app) => {
    app.use(VueQueryPlugin, {
      enableDevtoolsV6Plugin: true,
      queryClient,
    })
  },
} satisfies Plugin
