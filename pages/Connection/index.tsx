import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native"
import { useTheme } from "@react-navigation/native"
import { DismissKeyboard } from "../../helpers/utils"
import useFirebaseLogin from "../../hooks/useFirebaseLogin"
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico'
import AppLoading from "expo-app-loading"

const Connection = ({ navigation }: any) => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<any | null>(null)
    const { colors } = useTheme()
    const { loginUser } = useFirebaseLogin()
    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    })

    const handleLoginUser = (email: string, password: string) => {
        loginUser(email, password)
            .then(response => console.log(response))
            .catch(error => setError(error))
    }

    useEffect(() => {
        setError(null)
    }, [password, email])

    if (!fontsLoaded) {
        return <AppLoading />
    }
    else {
        return (
            <DismissKeyboard>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View style={styles.container}>
                        <View style={styles.body}>
                            <View style={styles.inputContainer}>
                                <Text style={[styles.brand, { color: colors.text }]}>Moure</Text>
                                <TextInput
                                    style={[styles.input, { borderColor: error && error.code === "auth/user-not-found" ? 'red' : colors.border, backgroundColor: colors.card, color: colors.text }]}
                                    onChangeText={setEmail}
                                    value={email}
                                    placeholder="Adresse email"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={[styles.input, { borderColor: error && error.code === "auth/wrong-password" ? 'red' : colors.border, backgroundColor: colors.card, color: colors.text }]}
                                    onChangeText={setPassword}
                                    value={password}
                                    placeholder="Mot de passe"
                                    secureTextEntry={true}
                                />
                                <TouchableOpacity
                                    onPress={() => handleLoginUser(email, password)}
                                    style={styles.buttonConnection}
                                >
                                    <Text style={styles.btnText}>Connexion</Text>
                                </TouchableOpacity>
                                {error && error.code === "auth/user-not-found" &&
                                    <Text style={{ color: 'red' }}>Adresse e-mail incorrect</Text>
                                }
                                {error && error.code === "auth/wrong-password" &&
                                    <Text style={{ color: 'red' }}>Mot de passe incorrect</Text>
                                }
                            </View>
                        </View>
                        <StatusBar style={"auto"} />
                    </View>
                </KeyboardAvoidingView>
            </DismissKeyboard>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: '100%'
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