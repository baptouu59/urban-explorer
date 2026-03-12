import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import DiscoverStack from "./DiscoverStack"
import MapScreen from "../screens/MapScreen"
import ProfileScreen from "../screens/ProfileScreen"

const Tab = createBottomTabNavigator()

export default function TabNavigator() {

  return (
    <Tab.Navigator>

      <Tab.Screen
        name="Découverte"
        component={DiscoverStack}
      />

      <Tab.Screen
        name="Carte"
        component={MapScreen}
      />

      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
      />

    </Tab.Navigator>
  )
}