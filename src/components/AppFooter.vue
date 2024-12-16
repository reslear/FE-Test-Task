<script setup lang="ts">
import { useColorMode, useTimeAgo } from '@vueuse/core'
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'

const mode = useColorMode()
const authStore = useAuthStore()
const { tokenExpiry, isAuthenticated } = storeToRefs(authStore)

const now = Date.now()
const timeAgo = useTimeAgo(
  computed(() => tokenExpiry.value),
  {
    showSecond: true,
    updateInterval: 1000,
  }
)
</script>

<template>
  <div class="flex justify-center">
    <span
      class="text-sm"
      :class="{
        'text-red-500': tokenExpiry <= now,
        'text-green-400': tokenExpiry > now,
      }"
      v-if="isAuthenticated"
    >
      {{ tokenExpiry <= now ? 'Token expired' : 'Token expires in' }}
      {{ timeAgo }}
    </span>
  </div>
  <footer class="flex justify-center items-center gap-2 p-4">
    <UButton
      :icon="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="ghost"
      :aria-label="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`"
      @click="mode = mode === 'dark' ? 'light' : 'dark'"
      title="Switch color mode"
    />
    <UButton
      icon="i-simple-icons:github"
      color="neutral"
      variant="ghost"
      href="https://github.com/reslear/FE-Test-Task"
      title="GitHub repository"
      target="_blank"
    />
  </footer>
</template>
