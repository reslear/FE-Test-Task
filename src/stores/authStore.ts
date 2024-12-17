import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    const tokenExpiry = ref<number>(0)

    const isAuthenticated = computed(
      () => token.value !== null && !checkTokenExpired()
    )

    function login(data: { token: string; tokenExpiry: number }) {
      token.value = data.token
      tokenExpiry.value = data.tokenExpiry
    }

    // helper's
    function checkTokenExpired() {
      return Date.now() > tokenExpiry.value
    }

    function $reset() {
      token.value = null
      tokenExpiry.value = 0
    }

    return {
      isAuthenticated,
      login,
      $reset,
      checkTokenExpired,
      token,
      tokenExpiry,
    }
  },
  {
    persist: true,
  }
)
