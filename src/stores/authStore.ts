import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  // for check if token is expired
  const tokenExpiry = useStorage('tokenExpiry', 0, sessionStorage)
  const cookies = useCookies(['token'])

  function isLoggedIn() {
    return !!cookies.get('token')
  }

  function authenticate(data: { token: string; tokenExpiry: number }) {
    tokenExpiry.value = data.tokenExpiry
    cookies.set('token', data.token, { expires: new Date(tokenExpiry.value) })
  }

  function $reset() {
    cookies.remove('token')
    tokenExpiry.value = 0
  }

  return {
    authenticate,
    isLoggedIn,
    tokenExpiry,
    $reset,
  }
})
