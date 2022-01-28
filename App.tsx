import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Connection, Home, Registration } from "./pages"
import { AppearanceProvider, useColorScheme } from "react-native-appearance"
import { MyDefaultTheme } from './themes/MyDefaultTheme'

const Stack = createNativeStackNavigator()

export default function App() {
  const scheme = useColorScheme()
  const { colors } = useTheme()

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : MyDefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Connection" component={Connection} options={{ headerBackButtonMenuEnabled: false, title: "", headerTransparent: true, headerTintColor: scheme === "dark" ? "#ffffff" : colors.text }} />
          <Stack.Screen name="Registration" component={Registration} options={{ headerBackButtonMenuEnabled: false, title: "", headerTransparent: true, headerTintColor: scheme === "dark" ? "#ffffff" : colors.text }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}