import { useEffect, useState } from "react"
import { FlatList, ActivityIndicator } from "react-native"
import { fetchPlaces } from "../services/api"
import LieuCard from "../components/LieuCard"
import { Place } from "../types"

export default function DiscoverScreen({ navigation }: any) {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const data = await fetchPlaces()
      setPlaces(data)
      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <ActivityIndicator size="large" />

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <LieuCard
          title={item.title}
          address={item.address_name}
          image="https://picsum.photos/200"
          onPress={() =>
            navigation.navigate("Details", { place: item })
          }
        />
      )}
    />
  )
}