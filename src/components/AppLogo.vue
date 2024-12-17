<script setup lang="ts">
import { COUNTRY_CODES } from '../consts'
</script>

<template>
  <div class="flex flex-col items-center relative">
    <UIcon class="size-10" name="i-lucide:cloud-sun" />
    <UAvatarGroup>
      <UIcon
        :key="country"
        class="size-5"
        :name="`i-circle-flags:${country}`"
        v-for="country in { ...COUNTRY_CODES }"
      />
    </UAvatarGroup>
    <div class="text-1xl font-bold mt-2">Weather App</div>
  </div>
</template>
