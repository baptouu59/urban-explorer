import { useEffect, useState } from "react"
import MapView, { Marker, Region } from "react-native-maps"
import * as Location from 'expo-location'
import { fetchPlaces } from "../services/api"
import { Place } from "../types"
import { Alert, StyleSheet, View, ActivityIndicator } from "react-native"
import { Colors } from "../constants/Theme"

export default function MapScreen() {

  const [places, setPlaces] = useState<Place[]>([])
  const [region, setRegion] = useState<Region>({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPlaces()
        setPlaces(data)
      } catch (error) {
        console.error("Error fetching places:", error)
      }
    }

    const requestLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert("Permission refusée", "L'accès à la position est nécessaire pour centrer la carte sur vous.")
          setLoading(false)
          return
        }

        let userLocation = await Location.getCurrentPositionAsync({})
        setRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        })
      } catch (error) {
        console.error("Error getting location:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
    requestLocation()
  }, [])

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={setRegion}
      showsUserLocation={true}
    >
      {places
        .filter((place) => place.lat_lon && place.lat_lon.lat && place.lat_lon.lon)
        .map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.lat_lon!.lat,
              longitude: place.lat_lon!.lon
            }}
            title={place.title}
          />
        ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  }
})