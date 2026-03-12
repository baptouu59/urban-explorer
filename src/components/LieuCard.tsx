import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Place } from '../types';

interface Props {
  place: Place;
  index: number;
  onPress: () => void;
}

export default function LieuCard({ place, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{place.nom_usuel}</Text>
      <Text style={styles.address}>{place.adresse}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#102542',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  address: {
    color: '#DCE6F2',
    fontSize: 14,
  },
});