import { View, Text, Image, Button, StyleSheet } from "react-native"

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
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <Text>{address}</Text>

      <Button title="Voir plus" onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  image: {
    height: 120,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  }
})