// login types
export type LoginRequest = {
  email: string
  password: string
  short?: boolean
}

export type LoginResponse = {
  token: string
  tokenExpiry: number
}

// weather types
export type WeatherRequest = {
  country: string
}

export type WeatherResponse = {
  country: string
  weather: string[]
}

// cities types
export type CitiesResponse = {
  cities: string[]
}
