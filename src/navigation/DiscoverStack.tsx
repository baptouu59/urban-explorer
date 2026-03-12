// src/navigation/DiscoverStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from '../screens/DiscoverScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import { DiscoverStackParamList } from '../types';

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

export default function DiscoverStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0f1c2e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ title: 'Découverte' }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{ title: 'Détail' }}
      />
    </Stack.Navigator>
  );
}
