<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useWeather } from '../composables/useApi'
import { DAYS, WEATHER_ICONS } from '../consts'

const route = useRoute()

const pageCountry = computed(() => {
  const country = route.params.city
  return Array.isArray(country) ? country[0] : country
})

const { data: weatherData, isPending, isError, error } = useWeather(pageCountry)

const items = computed(() => {
  if (!weatherData.value) return []

  const { weather } = weatherData.value

  return weather.map((item) => {
    const [type, state] = item.toLowerCase().split(', ')
    return {
      type,
      state,
    }
  })
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-center mb-4">{{ pageCountry }}</h1>

    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>

    <div class="grid w-full max-w-full" v-else-if="weatherData">
      <div
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
      >
        <UCard
          v-for="(item, i) in items"
          :key="pageCountry + i"
          class="transition hover:-translate-y-1 hover:scale-105"
        >
          <UIcon
            :name="WEATHER_ICONS[item.type]"
            class="text-4xl"
            :class="`weather-${item.type}`"
          />
          <h2 class="text-lg font-bold">{{ DAYS[i] }}</h2>
          <p>{{ item.state }}</p>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-cloudy {
  color: var(--color-gray-500);
}

.weather-rainy {
  color: var(--color-blue-500);
}

.weather-windy {
  color: var(--color-gray-500);
}

.weather-hot {
  color: var(--color-red-500);
}

.weather-sunny {
  color: var(--color-yellow-500);
}
</style>
