import { DarkTheme, NavigationContainer, useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Connection, Home, Profile, Registration } from "./pages"
import { AppearanceProvider, useColorScheme } from "react-native-appearance"
import { MyDefaultTheme } from './themes/MyDefaultTheme'
import { initializeApp } from "firebase/app"
import useFirebaseLogin from './hooks/useFirebaseLogin'
import { useEffect, useState } from 'react'
import { firebaseConfig } from './config/firebase'

const Stack = createNativeStackNavigator()

export default function App() {
  const { user, checkAuth } = useFirebaseLogin()
  const [loading, setLoading] = useState<boolean>(true)
  const scheme = useColorScheme()
  const { colors } = useTheme()


  useEffect(() => {
    initializeApp(firebaseConfig)
    checkAuth().then(() => {
      setLoading(false)
    })
  }, [checkAuth])

  console.log(`IONIC::::`, user)

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : MyDefaultTheme}>
        <Stack.Navigator>
          {user ? <Stack.Screen name="Profile" component={Profile} options={{ title: "Moure", headerTitleAlign: 'left', headerTintColor: scheme === "dark" ? "#ffffff" : colors.text }} /> :
            <>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="Connection" component={Connection} options={{ headerBackButtonMenuEnabled: false, title: "", headerTransparent: true, headerTintColor: scheme === "dark" ? "#ffffff" : colors.text }} />
              <Stack.Screen name="Registration" component={Registration} options={{ headerBackButtonMenuEnabled: false, title: "", headerTransparent: true, headerTintColor: scheme === "dark" ? "#ffffff" : colors.text }} />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}