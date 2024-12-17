import { MaybeRefOrGetter } from 'vue'
import { useQuery, useMutation } from '@tanstack/vue-query'
import { getWeather, postLogin, getCities } from '../api/api'
import type { LoginRequest, WeatherRequest } from '../types'

/**
 *  Login Mutation
 */
export const useLogin = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: (form: MaybeRefOrGetter<LoginRequest>) =>
      postLogin(toValue(form)),
  })

/**
 *  Weather Query
 */
export const useWeather = (
  country: MaybeRefOrGetter<WeatherRequest['country']>
) => {
  return useQuery({
    queryKey: ['weather', country],
    queryFn: ({ queryKey }) => getWeather({ country: toValue(queryKey[1]) }),
  })
}

/**
 *  Cities Query
 */
export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => await getCities(),
  })
}
