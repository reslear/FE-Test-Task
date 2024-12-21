<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useIsFetching } from '@tanstack/vue-query'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import AppHeader from './components/AppHeader.vue'
import { useAuthStore } from './stores/authStore'
const { isAuthenticated } = storeToRefs(useAuthStore())

const isFetching = useIsFetching()
</script>

<template>
  <UApp>
    <div
      class="h-screen w-screen overflow-hidden flex min-h-0 bg-[var(--ui-bg)] flex-col"
      vaul-drawer-wrapper
    >
      <UProgress v-if="isFetching" size="xs" :ui="{ root: 'absolute top-0' }" />
      <AppHeader v-if="isAuthenticated" />
      <div
        class="flex-1 flex flex-col items-center justify-around overflow-y-auto w-full py-14 px-4"
      >
        <Suspense>
          <RouterView />
        </Suspense>
      </div>
      <AppFooter />
    </div>
  </UApp>
  <VueQueryDevtools />
</template>

<style>
@import 'tailwindcss';
@import '@nuxt/ui';
</style>
