<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useColorMode } from '@vueuse/core'
const router = useRouter()
const mode = useColorMode()


</script>

<template>
  <UApp>
    <div class="h-screen w-screen overflow-hidden flex min-h-0 bg-[var(--ui-bg)]" vaul-drawer-wrapper>
<!--       <UNavigationMenu :items="items" orientation="vertical" class="hidden lg:flex border-e border-[var(--ui-border)] overflow-y-auto w-48 p-4" />
      <UNavigationMenu :items="items" orientation="horizontal" class="lg:hidden border-b border-[var(--ui-border)] [&>div]:min-w-min overflow-x-auto" />
 -->
      <div class="fixed top-15 lg:top-3 right-4 flex items-center gap-2">
        <UButton
          :icon="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="ghost"
          :aria-label="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`"
          @click="mode = mode === 'dark' ? 'light' : 'dark'"
        />
      </div>

      <div class="flex-1 flex flex-col items-center justify-around overflow-y-auto w-full py-14 px-4">
        <Suspense>
          <RouterView />
        </Suspense>
      </div>
    </div>
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
