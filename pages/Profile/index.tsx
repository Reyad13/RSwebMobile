import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"

const Profile = ({ navigation }: any) => {

    const { colors } = useTheme()

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={[styles.brand, { color: colors.text }]}>ko</Text>
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
        justifyContent: "center",
        paddingBottom: 100,
    },
    brand: {
        fontSize: 35,
        fontWeight: "bold",
        fontFamily: 'Pacifico_400Regular',
        marginBottom: 10,
    },
    inputContainer: {
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        width: "100%",
        padding: 10,
    },
    buttonConnection: {
        padding: 15,
        backgroundColor: "#D9205C",
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