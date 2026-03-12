import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CalendarModal from '../components/CalendarModal';
import { DiscoverStackParamList } from '../types';

type Props = {
  route: RouteProp<DiscoverStackParamList, 'PlaceDetail'>;
};

export default function PlaceDetailScreen({ route }: Props) {
  const { place } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const pulse = useRef(new Animated.Value(1)).current;
  const storageKey = `visit_plan_${place.id}`;

  useEffect(() => {
    const loadSavedDate = async () => {
      const saved = await AsyncStorage.getItem(storageKey);
      if (saved) setSelectedDate(saved);
    };

    loadSavedDate();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.04,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [pulse, storageKey]);

  const handleSelectDate = async (date: string) => {
    setSelectedDate(date);
    await AsyncStorage.setItem(storageKey, date);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{ uri: place.image }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{place.dateText || 'Sortie à Paris'}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.title}>{place.nom_usuel}</Text>

        <View style={styles.row}>
          <Ionicons name="location" size={18} color="#F4A261" />
          <Text style={styles.address}>{place.adresse}</Text>
        </View>

        <Text style={styles.description}>{place.description}</Text>

        <Pressable style={styles.secondaryButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="calendar-outline" size={18} color="#F4A261" />
          <Text style={styles.secondaryText}>Choisir une date de visite</Text>
        </Pressable>

        {selectedDate ? (
          <View style={styles.confirmationBox}>
            <Ionicons name="checkmark-circle" size={20} color="#2A9D8F" />
            <Text style={styles.confirmationText}>
              Visite à {place.nom_usuel} planifiée le {selectedDate}
            </Text>
          </View>
        ) : null}

        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <Pressable style={styles.mainButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.mainButtonText}>Planifier mon souvenir</Text>
          </Pressable>
        </Animated.View>
      </View>

      <CalendarModal
        visible={modalVisible}
        selectedDate={selectedDate}
        onClose={() => setModalVisible(false)}
        onSelectDate={handleSelectDate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08111F',
  },
  hero: {
    height: 280,
  },
  heroImage: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
    backgroundColor: 'rgba(8,17,31,0.25)',
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(244,162,97,0.95)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
  },
  content: {
    padding: 18,
  },
  title: {
    color: '#fff',
    fontSize: 29,
    fontWeight: '900',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  address: {
    color: '#DCE6F2',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  description: {
    color: '#F5F7FA',
    lineHeight: 23,
    fontSize: 15,
    marginBottom: 18,
  },
  secondaryButton: {
    backgroundColor: '#102542',
    borderWidth: 1,
    borderColor: '#F4A261',
    borderRadius: 16,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
  },
  secondaryText: {
    color: '#F4A261',
    fontWeight: '800',
    marginLeft: 8,
  },
  confirmationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#102542',
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
  },
  confirmationText: {
    color: '#fff',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  mainButton: {
    backgroundColor: '#E76F51',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
});