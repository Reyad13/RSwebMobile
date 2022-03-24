import { useTheme } from "@react-navigation/native"
import { useContext } from "react"
import { StyleSheet, Text } from "react-native"
import useFirebaseLogin from "../../hooks/useFirebaseLogin"
import { UserContext } from "../../providers/UserProvider"

const NavigationTitle = () => {

    const { colors } = useTheme()
    const { user, checkAuth } = useFirebaseLogin()
    const { userInfo } = useContext(UserContext)

    return (
        <Text style={[styles.brand, { color: colors.text }]}>{userInfo?.username}</Text>
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