export interface Coordinates {
  lat: number
  lon: number
}

export interface Place {
  id: string
  title: string
  address_name: string
  image_url?: string
  lat_lon?: Coordinates
}

export interface ApiResponse {
  results: any[]
}