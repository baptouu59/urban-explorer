import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import DiscoverStack from "./DiscoverStack"
import MapScreen from "../screens/MapScreen"
import ProfileScreen from "../screens/ProfileScreen"
import { Colors } from "../constants/Theme"

const Tab = createBottomTabNavigator()

export default function TabNavigator() {

  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.secondary,
            tabBarStyle: {
                borderTopWidth: 1,
                borderTopColor: Colors.border,
                backgroundColor: Colors.white,
                height: 60,
                paddingBottom: 10,
            },
            headerShown: false,
        }}
    >

      <Tab.Screen
        name="Découverte"
        component={DiscoverStack}
        options={{
            tabBarLabel: 'Explorer',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🔍</Text>
        }}
      />

      <Tab.Screen
        name="Carte"
        component={MapScreen}
        options={{
            tabBarLabel: 'Carte',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🗺️</Text>
        }}
      />

      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>
        }}
      />

    </Tab.Navigator>
  )
}

import { Text } from "react-native"