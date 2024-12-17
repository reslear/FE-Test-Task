/**
 * Example mock API server implementation only for deploy Github pages
 */
import { nanoid } from 'nanoid'
import type {
  CitiesResponse,
  LoginRequest,
  LoginResponse,
  WeatherRequest,
  WeatherResponse,
} from '../types'

const TOKEN_EXPIRY = 15 * 60 * 1000 // 15 minutes
const TOKEN_EXPIRY_SHORT = 30 * 1000 // 30 seconds

let token: string | null = null
let tokenExpiry: number | null = null

const weatherData = {
  USA: [
    'Sunny, 25°C',
    'Cloudy, 20°C',
    'Rainy, 22°C',
    'Sunny, 24°C',
    'Windy, 23°C',
    'Sunny, 26°C',
    'Cloudy, 21°C',
  ],
  Canada: [
    'Cloudy, 15°C',
    'Rainy, 12°C',
    'Sunny, 18°C',
    'Cloudy, 14°C',
    'Rainy, 10°C',
    'Sunny, 20°C',
    'Cloudy, 13°C',
  ],
  Germany: [
    'Rainy, 10°C',
    'Cloudy, 8°C',
    'Sunny, 12°C',
    'Rainy, 9°C',
    'Windy, 11°C',
    'Sunny, 14°C',
    'Cloudy, 10°C',
  ],
  Brazil: [
    'Hot, 30°C',
    'Sunny, 32°C',
    'Rainy, 28°C',
    'Hot, 31°C',
    'Sunny, 33°C',
    'Cloudy, 29°C',
    'Hot, 34°C',
  ],
  Australia: [
    'Windy, 20°C',
    'Sunny, 22°C',
    'Rainy, 18°C',
    'Cloudy, 21°C',
    'Windy, 19°C',
    'Sunny, 23°C',
    'Cloudy, 20°C',
  ],
} as Record<WeatherRequest['country'], string[]>

// Server API response type with status code
type ServerApiResponse<T = any> = Promise<T>

export const serverApi = {
  login: async (body: LoginRequest): ServerApiResponse<LoginResponse> => {
    // Simulate server delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const { email, password, short } = body

    const validCredentials = {
      email: 'example@email.com',
      password: 'example',
    }

    if (
      email === validCredentials.email &&
      password === validCredentials.password
    ) {
      token = nanoid(32)

      tokenExpiry =
        Date.now() + (short ? TOKEN_EXPIRY_SHORT : TOKEN_EXPIRY) * 1000
      return { token, tokenExpiry }
    } else {
      throw httpError(409, 'Invalid email or password')
    }
  },

  weather: async (body: WeatherRequest): ServerApiResponse<WeatherResponse> => {
    // Simulate server delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const { country } = body

    if (!token || (tokenExpiry && Date.now() > tokenExpiry)) {
      throw httpError(401, 'Unauthorized: Token expired or not provided')
    }

    if (country in weatherData) {
      const weather = weatherData[country]
      return { country, weather }
    } else {
      throw httpError(404, 'Country not found')
    }
  },

  cities: async (): ServerApiResponse<CitiesResponse> => {
    if (!token || (tokenExpiry && Date.now() > tokenExpiry)) {
      throw httpError(401, 'Unauthorized: Token expired or not provided')
    }
    return { cities: Object.keys(weatherData) }
  },
}

// error helper
function httpError(statusCode: number, statusText: string) {
  return new Response(null, {
    status: statusCode,
    statusText: statusText,
    headers: { 'Content-Type': 'application/json' },
  })
}
