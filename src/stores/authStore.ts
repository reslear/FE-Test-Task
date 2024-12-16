import { defineStore } from 'pinia'

// TODO: replace to 15 min
const EXPIRY_TIME = 1 * 60 * 1000

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    const tokenExpiry = ref<number>(0)

    const isAuthenticated = computed(
      () => token.value !== null && !checkTokenExpired()
    )

    function login(data: { token: string }) {
      token.value = data.token
      tokenExpiry.value = Date.now() + EXPIRY_TIME
    }

    function logout() {
      token.value = null
      tokenExpiry.value = 0
    }

    // helper's
    function checkTokenExpired() {
      console.log('checkTokenExpiration')
      if (tokenExpiry.value === null) return true
      return Date.now() > tokenExpiry.value
    }

    return {
      isAuthenticated,
      login,
      logout,
      checkTokenExpired,
      token,
      tokenExpiry,
    }
  },
  {
    persist: true,
  }
)
