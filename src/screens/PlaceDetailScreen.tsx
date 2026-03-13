import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Alert } from "react-native"
import { useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import CalendarModal from "../components/CalendarModal"
import { Place } from "../types"
import { Colors, Spacing, Radius, Shadows } from "../constants/Theme"

export default function PlaceDetailScreen({ route, navigation }: any) {
  const { place }: { place: Place } = route.params
  const [open, setOpen] = useState(false)
  const [plannedDate, setPlannedDate] = useState<string | null>(null)

  useEffect(() => {
    const loadPlannedDate = async () => {
      try {
        const savedDate = await AsyncStorage.getItem(`visit_${place.id}`)
        if (savedDate) {
          setPlannedDate(savedDate)
        }
      } catch (e) {
        console.error("Failed to load planned date", e)
      }
    }
    loadPlannedDate()
  }, [place.id])

  const handleConfirmDate = async (date: string) => {
    try {
      await AsyncStorage.setItem(`visit_${place.id}`, date)
      setPlannedDate(date)
      Alert.alert("Visite planifiée", `Votre visite pour "${place.title}" a été enregistrée pour le ${date}.`)
    } catch (e) {
      console.error("Failed to save planned date", e)
      Alert.alert("Erreur", "Impossible d'enregistrer la visite.")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: place.image_url || "https://picsum.photos/600/400" }} 
                    style={styles.image} 
                />
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{place.title}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Paris</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Localisation</Text>
                    <View style={styles.row}>
                        <Text style={styles.icon}>📍</Text>
                        <Text style={styles.addressText}>{place.address_name}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>À propos</Text>
                    <Text style={styles.description}>
                        Découvrez ce lieu magnifique situé au cœur de Paris. Parfait pour une visite en famille ou entre amis. Explorez l'histoire et la culture de ce monument emblématique de la ville lumière.
                    </Text>
                </View>

                {plannedDate && (
                  <View style={[styles.section, styles.plannedDateContainer]}>
                    <Text style={styles.sectionTitle}>Visite planifiée</Text>
                    <View style={styles.row}>
                      <Text style={styles.icon}>🗓️</Text>
                      <Text style={styles.plannedDateText}>{plannedDate}</Text>
                    </View>
                  </View>
                )}

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>⏱️</Text>
                        <Text style={styles.statValue}>2h</Text>
                        <Text style={styles.statLabel}>Durée</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>⭐</Text>
                        <Text style={styles.statValue}>4.8</Text>
                        <Text style={styles.statLabel}>Note</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>💰</Text>
                        <Text style={styles.statValue}>Gratuit</Text>
                        <Text style={styles.statLabel}>Entrée</Text>
                    </View>
                </View>
            </View>
        </ScrollView>

        <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => setOpen(true)}
            >
                <Text style={styles.primaryButtonText}>Planifier une visite</Text>
            </TouchableOpacity>
        </View>

        <CalendarModal
            visible={open}
            placeName={place.title}
            onClose={() => setOpen(false)}
            onConfirm={handleConfirmDate}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    height: 350,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    marginTop: -Radius.xl,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  badge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.sm,
  },
  badgeText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  plannedDateContainer: {
    backgroundColor: Colors.primary + '10',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  plannedDateText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  addressText: {
    fontSize: 16,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  statCard: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
    width: '30%',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
    ...Shadows.md,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  }
})