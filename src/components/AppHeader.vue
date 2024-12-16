<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { NavigationMenuItem } from '@nuxt/ui'
import { useCities } from '../composables/useApi'
import { useAuthStore } from '../stores/authStore'
import { COUNTRY_CODES } from '../consts'

const router = useRouter()
const { data: citiesData } = useCities()
const authStore = useAuthStore()

const items = computed((): NavigationMenuItem[] => {
  if (!citiesData.value) return []

  const { cities } = citiesData.value

  const citiesArr = cities.map((city) => ({
    label: city,
    to: `/weather/${city}`,
    icon: 'i-circle-flags:' + COUNTRY_CODES[city],
  }))

  return [
    {
      label: 'All weather',
      to: '/weather',
      icon: 'i-lucide:cloud-sun',
      class: 'pr-2',
    },
    ...citiesArr,
  ]
})

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="flex justify-center w-full p-2 gap-2">
    <UNavigationMenu
      :items="items"
      orientation="horizontal"
      class="w-auto overflow-x-auto"
    >
    </UNavigationMenu>

    <div class="flex items-center">
      <UButton
        icon="i-lucide-power"
        color="error"
        variant="soft"
        size="sm"
        title="Logout"
        @click="logout()"
      ></UButton>
    </div>
  </header>
</template>
