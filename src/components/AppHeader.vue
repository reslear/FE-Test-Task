<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useCities } from '../composables/useApi'

import { COUNTRY_CODES } from '../consts'

const { data: citiesData } = useCities()

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
</script>

<template>
  <header class="flex justify-center w-full p-2 gap-2">
    <UNavigationMenu
      :items="items"
      orientation="horizontal"
      class="w-auto overflow-x-auto"
    >
    </UNavigationMenu>
  </header>
</template>
