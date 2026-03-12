import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface CalendarModalProps {
  visible: boolean;
  selectedDate: string;
  onClose: () => void;
  onSelectDate: (date: string) => void;
}

export default function CalendarModal({
  visible,
  selectedDate,
  onClose,
  onSelectDate,
}: CalendarModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>Planifier ma visite</Text>
          <Text style={styles.subtitle}>
            Choisis une date pour ton futur souvenir.
          </Text>

          <Calendar
            onDayPress={(day) => onSelectDate(day.dateString)}
            markedDates={
              selectedDate
                ? {
                    [selectedDate]: {
                      selected: true,
                      selectedColor: '#F4A261',
                    },
                  }
                : {}
            }
            theme={{
              todayTextColor: '#F4A261',
              selectedDayBackgroundColor: '#F4A261',
              arrowColor: '#102542',
              monthTextColor: '#102542',
              textMonthFontWeight: '800',
            }}
          />

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Fermer</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(6, 12, 23, 0.62)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
  },
  title: {
    color: '#102542',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    textAlign: 'center',
    color: '#5D6B82',
    marginBottom: 14,
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#102542',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: '800',
  },
});