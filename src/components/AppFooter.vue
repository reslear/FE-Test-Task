<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

function toggleMode() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <footer class="flex justify-center items-center gap-2 p-4">
    <UButton
      :icon="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="ghost"
      :aria-label="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`"
      @click="toggleMode()"
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
