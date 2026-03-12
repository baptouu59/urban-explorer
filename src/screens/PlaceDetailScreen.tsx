import { View, Text, Button } from "react-native"
import { useState } from "react"
import CalendarModal from "../components/CalendarModal"
import { Place } from "../types"

export default function PlaceDetailScreen({ route }: any) {
  const { place }: { place: Place } = route.params

  const [open, setOpen] = useState(false)

  return (
    <View style={{ padding: 20 }}>

      <Text>{place.title}</Text>
      <Text>{place.address_name}</Text>

      <Button
        title="Planifier une visite"
        onPress={() => setOpen(true)}
      />

      <CalendarModal
        visible={open}
        placeName={place.title}
        onClose={() => setOpen(false)}
      />

    </View>
  )
}