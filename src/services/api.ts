import axios from "axios"
import { ApiResponse, Place } from "../types"

const api = axios.create({
  baseURL:
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets",
  timeout: 10000
})

export const fetchPlaces = async (): Promise<Place[]> => {
  const response = await api.get<ApiResponse>(
    "/lieux-culturels-a-paris/records?limit=30"
  )

  return response.data.results
}