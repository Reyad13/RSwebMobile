import { setStatusBarBackgroundColor, StatusBar } from "expo-status-bar"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import useFirebaseLogin from "../../hooks/useFirebaseLogin"
import { Avatar } from 'react-native-elements'
import React, { useContext } from "react"
import { UserContext } from "../../providers/UserProvider"
import { useColorScheme } from "react-native-appearance"
import { MyDarkTheme, MyDefaultTheme } from "../../themes"
import * as ImagePicker from 'expo-image-picker';




const Profile = ({ navigation }: any) => {

    const { colors } = useTheme()
    const { logout } = useFirebaseLogin()
    const { userInfo } = useContext(UserContext)
    const scheme = useColorScheme()

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    }

    const takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        _handleImagePicked(pickerResult);
      };

      
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.headerProfile}>
                    <View style={styles.abonneContainer}>
                        <Text style={[styles.number, { color: colors.text }]}>{userInfo?.nbAbonnes}</Text>
                        <Text style={[styles.title, { color: colors.text }]}>Abonnés</Text>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            size={94}
                            rounded
                            source={{ uri: userInfo?.avatar !== "" ? userInfo?.avatar : "https://i.ibb.co/yp3WwP4/avatar.png" }}
                        />
                        <Text style={styles.btnChangepicture} onPress={pickImage} >+</Text>
                        
                    </View>
                    <View style={styles.abonnementContainer}>
                        <Text style={styles.btnChangepicture} onPress={takePhoto} > Prendre photo</Text>
                        <Text style={[styles.number, { color: colors.text }]}>{userInfo?.nbAbonnements}</Text>
                        <Text style={[styles.title, { color: colors.text }]}>Abonnements</Text>
                    </View>
                </View>
                <View style={styles.subHeader}>
                    <Text style={[styles.nameText, { color: colors.text }]}>{userInfo?.firstName + " " + userInfo?.lastName}</Text>
                    <Text style={[styles.bioText, { color: colors.text }]}>Voici une petite biographie et vous en pensez quoi ?</Text>
                    <TouchableOpacity
                        onPress={() => logout()}
                        style={[styles.editProfile, { borderColor: scheme === "dark" ? MyDarkTheme.colors.card : MyDefaultTheme.colors.border }]}
                    >
                        <Text style={[styles.editProfileText, { color: colors.text }]}>Modifier profil</Text>
                    </TouchableOpacity>
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
    subHeader: {
        flex: 0,
        width: '100%',
        justifyContent: "flex-start",
    },
    editProfile: {
        padding: 10,
        backgroundColor: "transparent",
        alignItems: 'center',
        width: '100%',
        borderRadius: 5,
        borderWidth: 0.5,
        marginTop: 15
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
    nameText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 20,
    },
    bioText: {
        fontSize: 13,
        marginTop: 4,
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
    editProfileText: {
        fontSize: 12,
        fontWeight: "bold",
    },
    btnAvatar: {
        fontSize: 9,
        color: "#ffffff",
        fontWeight: "bold",
    },
    btnChangepicture: {
        marginTop: -30,
        color: "orange",
        fontSize: 32,
        fontWeight: "bold",
        
    },
    buttonAvatar: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '30%',
        marginLeft: '35%',
        top: '-90%',
        backgroundColor: "orange",


    }
})

export default Profile

function _handleImagePicked(pickerResult: ImagePicker.ImagePickerResult) {
    throw new Error("Function not implemented.")
}
