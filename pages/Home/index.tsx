import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Home = ({ navigation }: any) => {

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Connection")}
                style={styles.btn}
            >
                <Text style={styles.btnText}>Ouvrir Connexion</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        width: 305,
        height: 159,
    },
    btn: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        padding: 20,
        backgroundColor: "#68a0cf",
        borderRadius: 10,
    },
    btnText: {
        color: "#fff",
    },
})

export default Home