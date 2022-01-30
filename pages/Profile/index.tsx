import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import useFirebaseLogin from "../../hooks/useFirebaseLogin"

const Profile = ({ navigation }: any) => {

    const { colors } = useTheme()
    const { logout } = useFirebaseLogin()

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <TouchableOpacity
                    onPress={() => logout()}
                    style={styles.buttonConnection}
                >
                    <Text style={styles.btnText}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style={"auto"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 20,
    },
    buttonConnection: {
        padding: 15,
        backgroundColor: "#E01422",
        alignItems: 'center',
        width: '100%',
        borderRadius: 5,
        margin: 12,
    },
    btnText: {
        fontSize: 14,
        color: "#ffffff",
        fontWeight: "bold",
    },
})

export default Profile