import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import useFirebaseLogin from "../../hooks/useFirebaseLogin"
import { Avatar, colors } from 'react-native-elements'

const Profile = ({ navigation }: any) => {

    const { colors } = useTheme()
    const { logout } = useFirebaseLogin()

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.headerProfile}>
                    <View style={styles.abonneContainer}>
                        <Text style={[styles.number, { color: colors.text }]}>5893</Text>
                        <Text style={[styles.title, { color: colors.text }]}>Abonnés</Text>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            size={94}
                            rounded
                            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
                        />
                    </View>
                    <View style={styles.abonnementContainer}>
                        <Text style={[styles.number, { color: colors.text }]}>203</Text>
                        <Text style={[styles.title, { color: colors.text }]}>Abonnements</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={() => logout()}
                        style={styles.buttonConnection}
                    >
                        <Text style={styles.btnText}>Se déconnecter</Text>
                    </TouchableOpacity>
                </View>
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
    headerProfile: {
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatarContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    abonneContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    abonnementContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
    },
    number: {
        fontSize: 20,
        fontWeight: "600",
    },
    content: {
        flex: 3,
        width: '100%',
        justifyContent: "flex-end",
    },
    buttonConnection: {
        padding: 15,
        backgroundColor: "#E01422",
        alignItems: 'center',
        width: '100%',
        borderRadius: 5,
    },
    btnText: {
        fontSize: 14,
        color: "#ffffff",
        fontWeight: "bold",
    },
})

export default Profile