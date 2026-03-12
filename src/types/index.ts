export interface Coordinates {
  lat: number
  lon: number
}

// export interface Place {
//   recordid: string
//   nom_usuel: string
//   adresse: string
//   coordonnees_geo: Coordinates
// }

export interface Place {
  id: string
  title: string
  address_name: string
  lat_lon?: Coordinates
}

export interface ApiResponse {
  results: Place[]
}