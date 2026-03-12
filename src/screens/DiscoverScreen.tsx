// src/screens/DiscoverScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchPlaces } from '../services/api';
import { DiscoverStackParamList, Place } from '../types';
import LieuCard from '../components/LieuCard';

type NavProp = NativeStackNavigationProp<DiscoverStackParamList, 'Discover'>;

export default function DiscoverScreen() {
  const navigation = useNavigation<NavProp>();

  const [places, setPlaces] = useState<Place[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadPlaces = async () => {
    try {
      setError('');
      const data = await fetchPlaces(); // Place[]
      setPlaces(data);
    } catch (e) {
      setError("Impossible de charger les événements.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  const filteredPlaces = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return places;

    return places.filter(
      (place) =>
        place.nom_usuel.toLowerCase().includes(value) ||
        place.adresse.toLowerCase().includes(value)
    );
  }, [search, places]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F4A261" />
        <Text style={styles.loaderText}>Chargement des sorties à découvrir...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadPlaces();
            }}
            tintColor="#F4A261"
          />
        }
        ListHeaderComponent={
          <>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1200&q=80',
              }}
              style={styles.hero}
              imageStyle={styles.heroImage}
            >
              <View style={styles.heroOverlay}>
                <Text style={styles.heroBadge}>Paris • Événements • Souvenirs</Text>
                <Text style={styles.heroTitle}>Urban Explorer</Text>
                <Text style={styles.heroSubtitle}>
                  Découvre des sorties à Paris, planifie tes visites et garde le souvenir de tes explorations.
                </Text>
              </View>
            </ImageBackground>

            <View style={styles.searchBox}>
              <Ionicons name="search" size={20} color="#7E8CA0" />
              <TextInput
                style={styles.input}
                placeholder="Rechercher un événement ou une adresse..."
                placeholderTextColor="#7E8CA0"
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Événements à explorer</Text>
              <Text style={styles.sectionCount}>{filteredPlaces.length}</Text>
            </View>
          </>
        }
        renderItem={({ item, index }) => (
          <LieuCard
            place={item}
            index={index}
            onPress={() => navigation.navigate('PlaceDetail', { place: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08111F',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 28,
  },
  hero: {
    height: 240,
    marginBottom: 18,
  },
  heroImage: {
    borderRadius: 28,
  },
  heroOverlay: {
    flex: 1,
    borderRadius: 28,
    padding: 18,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(9, 18, 33, 0.38)',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(244,162,97,0.95)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 14,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
  },
  heroSubtitle: {
    color: '#F5F7FA',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    maxWidth: '90%',
  },
  searchBox: {
    backgroundColor: '#102542',
    borderRadius: 18,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    paddingVertical: 14,
    fontSize: 15,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '900',
  },
  sectionCount: {
    color: '#F4A261',
    fontWeight: '800',
    fontSize: 15,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#08111F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loaderText: {
    marginTop: 12,
    color: '#fff',
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
});
