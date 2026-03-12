import { Modal, View, Text, Button } from "react-native"
import { Calendar } from "react-native-calendars"
import { useState } from "react"

interface Props {
  visible: boolean
  placeName: string
  onClose: () => void
}

export default function CalendarModal({
  visible,
  placeName,
  onClose
}: Props) {
  const [date, setDate] = useState<string | null>(null)

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ padding: 20 }}>

        <Calendar
          onDayPress={(day) => setDate(day.dateString)}
        />

        {date && (
          <Text>
            Visite au {placeName} planifiée le {date}
          </Text>
        )}

        <Button title="Fermer" onPress={onClose} />

      </View>
    </Modal>
  )
}