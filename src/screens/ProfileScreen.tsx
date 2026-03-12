import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PROFILE_PHOTO_KEY = 'urban_explorer_profile_photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(30)).current;
  const avatarScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadPhoto = async () => {
      const savedPhoto = await AsyncStorage.getItem(PROFILE_PHOTO_KEY);
      if (savedPhoto) setPhotoUri(savedPhoto);
    };

    loadPhoto();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(avatarScale, {
          toValue: 1.04,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.timing(avatarScale, {
          toValue: 1,
          duration: 1100,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
    return () => pulse.stop();
  }, [avatarScale, fadeAnim, translateAnim]);

  const savePhoto = async (uri: string) => {
    try {
      await AsyncStorage.setItem(PROFILE_PHOTO_KEY, uri);
      setPhotoUri(uri);
    } catch {
      Alert.alert('Erreur', 'Impossible de sauvegarder la photo.');
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission refusée', 'La caméra est nécessaire.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      await savePhoto(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission refusée', 'La galerie est nécessaire.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      await savePhoto(result.assets[0].uri);
    }
  };

  const removePhoto = async () => {
    await AsyncStorage.removeItem(PROFILE_PHOTO_KEY);
    setPhotoUri(null);
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateAnim }],
              },
            ]}
          >
            <View style={styles.badge}>
              <Ionicons name="camera" size={16} color="#fff" />
              <Text style={styles.badgeText}>Sauvegarder ses souvenirs</Text>
            </View>

            <Text style={styles.title}>Mon Profil</Text>
            <Text style={styles.subtitle}>
              Prends un selfie souvenir et personnalise ton identité de voyageuse urbaine.
            </Text>

            <BlurView intensity={25} tint="dark" style={styles.heroCard}>
              <View style={styles.heroTop}>
                <View>
                  <Text style={styles.heroTitle}>Mon souvenir</Text>
                  <Text style={styles.heroText}>Urban Explorer</Text>
                </View>

                <Image
                  source={{
                    uri: 'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',
                  }}
                  style={styles.heroGif}
                />
              </View>

              <Animated.View
                style={[
                  styles.avatarWrapper,
                  { transform: [{ scale: avatarScale }] },
                ]}
              >
                <View style={styles.avatarRing}>
                  <Image
                    source={{
                      uri:
                        photoUri ||
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
                    }}
                    style={styles.avatar}
                  />
                </View>
              </Animated.View>

              <Text style={styles.profileName}>Exploratrice</Text>
              <Text style={styles.profileRole}>Photo • Souvenir • Paris</Text>
            </BlurView>

            <BlurView intensity={28} tint="light" style={styles.actionsCard}>
              <Pressable style={[styles.actionButton, styles.primaryButton]} onPress={takePhoto}>
                <View style={styles.iconCirclePrimary}>
                  <Ionicons name="camera" size={22} color="#fff" />
                </View>
                <View style={styles.actionTextBox}>
                  <Text style={styles.actionTitleWhite}>Prendre une photo</Text>
                  <Text style={styles.actionSubtitleWhite}>
                    Capture directement un selfie souvenir
                  </Text>
                </View>
              </Pressable>

              <Pressable style={[styles.actionButton, styles.secondaryButton]} onPress={pickFromGallery}>
                <View style={styles.iconCircleSecondary}>
                  <Ionicons name="images" size={22} color="#102542" />
                </View>
                <View style={styles.actionTextBox}>
                  <Text style={styles.actionTitleDark}>Choisir depuis la galerie</Text>
                  <Text style={styles.actionSubtitleDark}>
                    Sélectionne une image déjà enregistrée
                  </Text>
                </View>
              </Pressable>

              {photoUri ? (
                <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={removePhoto}>
                  <View style={styles.iconCircleDelete}>
                    <Ionicons name="trash" size={22} color="#fff" />
                  </View>
                  <View style={styles.actionTextBox}>
                    <Text style={styles.actionTitleWhite}>Supprimer la photo</Text>
                    <Text style={styles.actionSubtitleWhite}>
                      Réinitialise ton avatar souvenir
                    </Text>
                  </View>
                </Pressable>
              ) : null}
            </BlurView>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="map-marker-radius" size={24} color="#F4A261" />
                <Text style={styles.statNumber}>Carte</Text>
                <Text style={styles.statLabel}>Explorer Paris</Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons name="calendar" size={24} color="#2A9D8F" />
                <Text style={styles.statNumber}>Visite</Text>
                <Text style={styles.statLabel}>Planifier</Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons name="camera-outline" size={24} color="#E76F51" />
                <Text style={styles.statNumber}>Photo</Text>
                <Text style={styles.statLabel}>Immortaliser</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(8,17,31,0.78)',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  content: { width: '100%' },
  badge: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244,162,97,0.90)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 16,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '800',
    marginLeft: 8,
    fontSize: 13,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#DCE6F2',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 22,
  },
  heroCard: {
    borderRadius: 28,
    padding: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.10)',
    marginBottom: 22,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },
  heroText: {
    color: '#DCE6F2',
    marginTop: 4,
  },
  heroGif: {
    width: 72,
    height: 72,
    borderRadius: 18,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 16,
  },
  avatarRing: {
    borderWidth: 4,
    borderColor: '#F4A261',
    padding: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#ddd',
  },
  profileName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  profileRole: {
    color: '#DCE6F2',
    textAlign: 'center',
    marginTop: 6,
  },
  actionsCard: {
    borderRadius: 28,
    padding: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.14)',
    marginBottom: 22,
  },
  actionButton: {
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButton: { backgroundColor: '#E76F51' },
  secondaryButton: { backgroundColor: '#F4E3C1' },
  deleteButton: {
    backgroundColor: '#D1495B',
    marginBottom: 0,
  },
  iconCirclePrimary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconCircleSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(16,37,66,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconCircleDelete: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionTextBox: { flex: 1 },
  actionTitleWhite: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  actionSubtitleWhite: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 13,
    lineHeight: 18,
  },
  actionTitleDark: {
    color: '#102542',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  actionSubtitleDark: {
    color: '#334A68',
    fontSize: 13,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 10,
  },
  statLabel: {
    color: '#DCE6F2',
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
});