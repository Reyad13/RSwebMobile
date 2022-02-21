import { DarkTheme, NavigationContainer, useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Connection, Start, Message, Profile, Registration, Search, Home, New } from "./pages"
import { AppearanceProvider, useColorScheme } from "react-native-appearance"
import { initializeApp } from "firebase/app"
import useFirebaseLogin from './hooks/useFirebaseLogin'
import { useEffect, useState } from 'react'
import { firebaseConfig } from './config/firebase'
import { LogoTitle, NavigationTitle } from './components'
import { Icon } from "react-native-elements"
import { StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MyDarkTheme, MyDefaultTheme } from './themes'
import { UserProvider } from './providers'

initializeApp(firebaseConfig)

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  const { user, checkAuth } = useFirebaseLogin()
  const [loading, setLoading] = useState<boolean>(true)
  const scheme = useColorScheme()
  const { colors } = useTheme()
  const { logout } = useFirebaseLogin()

  useEffect(() => {
    initializeApp(firebaseConfig)
    checkAuth().then(() => {
      setLoading(false)
    })
  }, [checkAuth])

  const hideBottomTabBarLabel = () => {
    return null
  }

  const setActiveBottomNavigationColor = () => {
    if (scheme === "dark") {
      return "#ffffff"
    }
    return "#000000"
  }

  console.log(`IONIC::::`, user)

  function Accueil() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
          headerTitle: (props) => <LogoTitle {...props} />, headerStyle: { backgroundColor: scheme === "dark" ? MyDarkTheme.colors.background : MyDefaultTheme.colors.background }, headerRight: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} style={styles.buttonSearch}>
              <Icon
                name='user-circle'
                size={25}
                color={scheme === "dark" ? "#ffffff" : "#000000"}
                type='font-awesome'
              />
            </TouchableOpacity>
          )
        })} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: (props) => <NavigationTitle {...props} />, headerBackVisible: false, headerStyle: { backgroundColor: scheme === "dark" ? MyDarkTheme.colors.background : MyDefaultTheme.colors.background } }} />
      </Stack.Navigator>
    )
  }

  return (
    <AppearanceProvider>
      <UserProvider>
        <>
          <NavigationContainer theme={scheme === "dark" ? MyDarkTheme : MyDefaultTheme}>
            {user ?
              <Tab.Navigator
                screenOptions={{
                  tabBarStyle: {
                    backgroundColor: scheme === "dark" ? MyDarkTheme.colors.background : MyDefaultTheme.colors.background,
                    borderTopColor: scheme === "dark" ? MyDarkTheme.colors.card : MyDefaultTheme.colors.border
                  }
                }}
              >
                <Tab.Screen name="Accueil" component={Accueil} options={{ headerShown: false, tabBarActiveTintColor: setActiveBottomNavigationColor(), tabBarLabel: hideBottomTabBarLabel, tabBarIcon: ({ color }) => (<Icon name="home" color={color} size={25} type='antdesign' />) }} />
                <Tab.Screen name="New" component={New} options={{ tabBarActiveTintColor: setActiveBottomNavigationColor(), tabBarLabel: hideBottomTabBarLabel, tabBarIcon: ({ color }) => (<Icon name="md-add-circle-outline" color={color} size={25} type='ionicon' />) }} />
                <Tab.Screen name="Search" component={Search} options={{ tabBarActiveTintColor: setActiveBottomNavigationColor(), tabBarLabel: hideBottomTabBarLabel, tabBarIcon: ({ color }) => (<Icon name="search1" color={color} size={25} type='antdesign' />) }} />
                <Tab.Screen name="Message" component={Message} options={{ tabBarActiveTintColor: setActiveBottomNavigationColor(), tabBarLabel: hideBottomTabBarLabel, tabBarIcon: ({ color }) => (<Icon name="message1" color={color} size={25} type='antdesign' />) }} />
              </Tab.Navigator>
              :
              <Stack.Navigator>
                <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
                <Stack.Screen name="Connection" component={Connection} options={{ headerBackButtonMenuEnabled: false, title: "", headerTransparent: true, headerTintColor: scheme === "dark" ? "#ffffff" : colors.text }} />
                <Stack.Screen name="Registration" component={Registration} options={{ headerBackButtonMenuEnabled: false, title: "", headerTransparent: true, headerTintColor: scheme === "dark" ? "#ffffff" : colors.text }} />
              </Stack.Navigator>
            }
          </NavigationContainer>
        </>
      </UserProvider>
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