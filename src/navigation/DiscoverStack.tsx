import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DiscoverScreen from "../screens/DiscoverScreen"
import PlaceDetailScreen from "../screens/PlaceDetailScreen"

const Stack = createNativeStackNavigator()

export default function DiscoverStack() {

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ title: "Découverte" }}
      />

      <Stack.Screen
        name="Details"
        component={PlaceDetailScreen}
        options={{ title: "Détails" }}
      />

    </Stack.Navigator>
  )
}