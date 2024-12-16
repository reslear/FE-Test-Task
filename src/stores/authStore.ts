import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref<string | null>(null)

    return {
      accessToken,
    }
  },
  {
    persist: true,
  }
)
