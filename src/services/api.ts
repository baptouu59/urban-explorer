import axios from "axios"
import { ApiResponse, Place } from "../types"

const api = axios.create({
  baseURL:
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets",
  timeout: 10000
})

export const fetchPlaces = async (): Promise<Place[]> => {
  const response = await api.get<ApiResponse>(
    "/que-faire-a-paris-/records?limit=20"
  )

  return response.data.results
}