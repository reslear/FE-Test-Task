/*
  TODO: fallback server api for github works
  maybe in feature replace to real server api
*/

import { serverApi } from './serverApi'

import type { LoginRequest, WeatherRequest } from '../types'

export const postLogin = async (body: LoginRequest) => {
  return serverApi.login(body)
}

export const getWeather = async (body: WeatherRequest) => {
  return serverApi.weather(body)
}

export const getCities = async () => {
  return serverApi.cities()
}
