import { StatusBar } from "expo-status-bar"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AppLoading from 'expo-app-loading'
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico'

const Home = ({ navigation }: any) => {

    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.brandContainer}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={require('./../../assets/icon_white.png')}
                    />
                    <Text style={styles.brand}>Moure</Text>
                    <Text style={styles.subbrand}>Bienvenue sur Moure !</Text>
                    <Text style={styles.subbrand}>Partagez vos plus beaux souvenirs avec vos amis</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Connection")}
                        style={styles.btnLeft}
                    >
                        <Text style={styles.btnText}>Connexion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Registration")}
                        style={styles.btnRight}
                    >
                        <Text style={styles.btnText}>Inscription</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style="light" />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f007c",
        alignItems: "center",
        justifyContent: "center",
    },
    brandContainer: {
        flex: 2,
        width: '100%',
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 100,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    brand: {
        color: "#fff",
        fontSize: 35,
        fontWeight: "bold",
        fontFamily: 'Pacifico_400Regular',
        marginBottom: 10,
    },
    subbrand: {
        color: "#a67efa",
    },
    image: {
        width: 80,
        height: 60,
    },
    btnLeft: {
        marginRight: 1,
        padding: 15,
        flex: 1,
        backgroundColor: "#D9205C",
        alignItems: 'center',
        width: '50%',
    },
    btnRight: {
        marginLeft: 1,
        padding: 15,
        backgroundColor: "#f79f1a",
        flex: 1,
        alignItems: 'center',
        width: '50%',
    },
    btnText: {
        color: "#fff",
        fontWeight: 'bold',
        fontFamily: 'Pacifico_400Regular',
        fontSize: 20,
    },
})

export default Home