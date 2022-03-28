import { useTheme } from "@react-navigation/native"
import { StyleSheet, Text } from "react-native"
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico'
import AppLoading from "expo-app-loading"

const LogoTitle = () => {

    const { colors } = useTheme()
    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }
    else {
        return (
            <Text style={[styles.brand, { color: colors.text }]}>Moure</Text>
        )
    }
}


const styles = StyleSheet.create({
    brand: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: 'Pacifico_400Regular',
        flex: 0,
        alignItems: 'flex-start',
        width: '100%'
    },
})

export default LogoTitle