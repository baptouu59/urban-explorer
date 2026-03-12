// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DiscoverStack from './DiscoverStack';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { TabParamList } from '../types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#102542',
          borderTopColor: 'rgba(255,255,255,0.08)',
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#F4A261',
        tabBarInactiveTintColor: '#C9D6EA',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Découverte') {
            return <Ionicons name="compass" size={size} color={color} />;
          }
          if (route.name === 'Carte') {
            return (
              <MaterialCommunityIcons
                name="map-marker-path"
                size={size}
                color={color}
              />
            );
          }
          return <Ionicons name="person-circle" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Découverte" component={DiscoverStack} />
      <Tab.Screen name="Carte" component={MapScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
