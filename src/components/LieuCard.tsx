import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Colors, Spacing, Radius, Shadows } from "../constants/Theme"

interface Props {
  title: string
  address: string
  image: string
  onPress: () => void
}

export default function LieuCard({
  title,
  address,
  image,
  onPress
}: Props) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        
        <View style={styles.addressContainer}>
          <Text style={styles.addressIcon}>📍</Text>
          <Text style={styles.address} numberOfLines={1}>{address}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.moreInfo}>Voir les détails</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  image: {
    height: 180,
    width: '100%',
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.xs,
    lineHeight: 24,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  addressIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  address: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  moreInfo: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  arrowIcon: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
  }
})