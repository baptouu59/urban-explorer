import { useEffect, useState } from "react"
import MapView, { Marker } from "react-native-maps"
import { fetchPlaces } from "../services/api"
import { Place } from "../types"

export default function MapScreen() {

  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await fetchPlaces()
      setPlaces(data)
    }

    load()
  }, [])

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }}
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          coordinate={{
            latitude: place.lat_lon?.lat || 0,
            longitude: place.lat_lon?.lon || 0 
          }}
          title={place.title}
        />
      ))}
    </MapView>
  )
}