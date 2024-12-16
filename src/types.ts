// login types
export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
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
