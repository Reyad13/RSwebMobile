import { useTheme } from "@react-navigation/native"
import { StyleSheet, Text } from "react-native"
import useFirebaseLogin from "../../hooks/useFirebaseLogin"

const NavigationTitle = () => {

    const { colors } = useTheme()
    const { user, checkAuth } = useFirebaseLogin()

    return (
        <Text style={[styles.brand, { color: colors.text }]}>moustapha_ndr</Text>
    )
}


const styles = StyleSheet.create({
    brand: {
        fontSize: 24,
        fontWeight: "bold",
        flex: 0,
        alignItems: 'flex-start',
        width: '100%'
    },
})

export default NavigationTitle