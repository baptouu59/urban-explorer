import { Modal, View, Text, Button, StyleSheet } from "react-native"
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
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Planifier votre visite</Text>
        <Text style={styles.subtitle}>Lieu : {placeName}</Text>

        <Calendar
          onDayPress={(day) => setDate(day.dateString)}
          markedDates={
            date
              ? {
                [date]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: "#007AFF"
                }
              }
              : {}
          }
          theme={{
            selectedDayBackgroundColor: "#007AFF",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#007AFF",
            arrowColor: "#007AFF"
          }}
          style={styles.calendar}
        />

        {date && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Visite planifiée le{" "}
              <Text style={{ fontWeight: "bold" }}>{date}</Text>
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Confirmer" onPress={onClose} color="#007AFF" />
          <View style={{ height: 10 }} />
          <Button title="Annuler" onPress={onClose} color="#FF3B30" />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333"
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#666"
  },
  calendar: {
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 24
  },
  infoBox: {
    backgroundColor: "#F2F2F7",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333"
  },
  buttonContainer: {
    marginTop: "auto"
  }
})