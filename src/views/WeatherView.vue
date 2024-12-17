<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

const router = useRouter()
const authStore = useAuthStore()
const { tokenExpiry } = storeToRefs(authStore)

const timeAgo = useTimeAgo(tokenExpiry, {
  showSecond: true,
  updateInterval: 1000,
})

const isExpired = computed(
  () => timeAgo.value.includes('ago') && authStore.checkTokenExpired()
)

function logout() {
  authStore.$reset()
  queryClient.clear()
  router.push('/login')
}
</script>

<template>
  <div>Select Country from header, for weather details.</div>

  <UCard class="flex flex-col gap-2 items-center">
    <div>
      <span
        class="text-sm"
        :class="isExpired ? 'text-red-500' : 'text-green-400'"
      >
        {{
          isExpired
            ? 'Token expired, please re-login'
            : 'Token expires ' + timeAgo
        }}
      </span>
    </div>
    <template #footer>
      <UButton
        icon="i-lucide-power"
        color="error"
        variant="soft"
        size="sm"
        title="Logout"
        @click="logout()"
        >Logout</UButton
      >
    </template>
  </UCard>
</template>
