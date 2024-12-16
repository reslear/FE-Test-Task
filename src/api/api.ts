// import { createFetch } from '@vueuse/core'
// import { useAuthStore } from '../stores/authStore'
import { serverApi } from './serverApi'
import type { LoginRequest, WeatherRequest } from '../types'

export const postLogin = async (body: LoginRequest) => {
  //TODO: replace to fetch/axios
  return serverApi.login(body)
}

export const getWeather = async (body: WeatherRequest) => {
  return serverApi.weather(body)
}

export const getCities = async () => {
  console.log('getCities')
  const data = await serverApi.cities()

  return data
}

// export const useFetch = createFetch({
//   baseUrl: 'https://my-api.com',
//   options: {
//     async beforeFetch({ options }) {
//       const authStore = useAuthStore()
//       if (authStore.token) {
//         options.headers = {
//           Authorization: `Bearer ${authStore.token}`,
//         }
//       }

//       return { options }
//     },
//   },
//   fetchOptions: {
//     mode: 'cors',
//   },
// })
