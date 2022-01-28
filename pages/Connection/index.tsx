import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native"
import { useTheme } from "@react-navigation/native"
import { DismissKeyboard } from "../../helpers/utils"

const Connection = ({ navigation }: any) => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { colors } = useTheme()

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={[styles.brand, { color: colors.text }]}>Moure</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { borderColor: colors.border, backgroundColor: colors.card, color: colors.text }]}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Adresse email"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={[styles.input, { borderColor: colors.border, backgroundColor: colors.card, color: colors.text }]}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Mot de passe"
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Connection")}
                            style={styles.buttonConnection}
                        >
                            <Text style={styles.btnText}>Connexion</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar style={"auto"} />
            </View>
        </DismissKeyboard>
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

export default Connection