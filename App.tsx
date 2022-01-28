import { DarkTheme, NavigationContainer, useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Connection, Home, Profile, Registration } from "./pages"
import { AppearanceProvider, useColorScheme } from "react-native-appearance"
import { MyDefaultTheme } from './themes/MyDefaultTheme'
import { initializeApp } from "firebase/app"
import useFirebaseLogin from './hooks/useFirebaseLogin'
import { useEffect, useState } from 'react'
import { firebaseConfig } from './config/firebase'
import { LogoTitle } from './components'
import { Icon, Button } from "react-native-elements"
import { StyleSheet, TouchableOpacity } from 'react-native'

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

  const onPress = () => {
    alert("test")
  }

  console.log(`IONIC::::`, user)

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : MyDefaultTheme}>
        <Stack.Navigator>
          {user ? <Stack.Screen name="Profile" component={Profile} options={{
            headerTitle: (props) => <LogoTitle {...props} />, headerStyle: { backgroundColor: '#ff6900' }, headerRight: () => (
              <TouchableOpacity onPress={onPress} style={styles.buttonSearch}>
                <Icon
                  name='search'
                  size={25}
                  color={scheme === "dark" ? "#ffffff" : "#000000"}
                />
              </TouchableOpacity>
            )
          }} /> :
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

const styles = StyleSheet.create({
  buttonSearch: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: -20,
  }
})