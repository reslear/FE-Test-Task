<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { z } from 'zod'
import { useLogin } from '../composables/useApi'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import AppLogo from '../components/AppLogo.vue'

const router = useRouter()
const toast = useToast()
const { mutateAsync: login, isPending, isError, error } = useLogin()
const authStore = useAuthStore()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(7, 'Must be at least 7 characters'),
  short: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  short: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const data = await login(event.data)

    if (data.token) {
      authStore.login({
        token: data.token,
        tokenExpiry: data.tokenExpiry,
      })

      toast.add({
        title: 'Login Success',
        color: 'success',
        type: 'background',
      })

      router.push('/weather')
    } else {
      throw new Error('No token found')
    }
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error?.message,
      color: 'error',
    })
    return
  }
}

// Test functions
function _testSetWrongData() {
  Object.assign(state, {
    email: 'abw.com',
    password: '123_',
  })
}
function _testSetCorrectData() {
  Object.assign(state, {
    email: 'example@email.com',
    password: 'example',
  })
}

onMounted(() => {})
</script>

<template>
  <div>
    <AppLogo class="mb-10" />
    <UCard class="p-2 w-full sm:w-sm">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-3"
        @submit="onSubmit"
        :validateOn="[]"
        :disabled="isPending"
      >
        <h1 class="text-2xl font-bold">Login</h1>

        <UAlert
          v-if="isError"
          color="error"
          variant="soft"
          :description="error?.message"
          icon="i-lucide-terminal"
        />

        <UFormField name="email">
          <UInput
            v-model="state.email"
            placeholder="Email..."
            icon="i-lucide-mail"
            class="w-full"
          />
        </UFormField>

        <UFormField name="password">
          <UInput
            icon="i-lucide-key-square"
            v-model="state.password"
            placeholder="Password..."
            type="password"
            class="w-full"
          />
        </UFormField>

        <UFormField name="short" label="30 sec expire">
          <USwitch v-model="state.short" />
        </UFormField>

        <div class="flex gap-2 items-center justify-between">
          <UButton type="submit" size="lg" :loading="isPending">Submit</UButton>
          <div class="flex gap-2">
            <UButton
              size="xs"
              @click="_testSetWrongData"
              color="neutral"
              variant="soft"
              >Set wrong</UButton
            >
            <UButton
              size="xs"
              @click="_testSetCorrectData"
              color="neutral"
              variant="soft"
              >Set correct</UButton
            >
          </div>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
