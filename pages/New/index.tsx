import { useTheme, useIsFocused } from "@react-navigation/native"
import { TouchableOpacity, StyleSheet, Image, TextInput, View, Text, KeyboardAvoidingView } from "react-native"
import { Form, Formik } from 'formik'
import * as ImagePicker from 'expo-image-picker'
import { useContext, useEffect, useRef, useState } from "react"
import { DismissKeyboard } from "../../helpers/utils"
import { collection, serverTimestamp, getFirestore, addDoc } from "firebase/firestore"
import useFirebaseLogin from "../../hooks/useFirebaseLogin"
import { getAuth } from "@firebase/auth"
import { UserContext } from "../../providers/UserProvider"

const New = ({ navigation }: any) => {

    const isFocused = useIsFocused()
    const { colors } = useTheme()
    const [image, setImage] = useState<string | null>(null)
    const [initialValues, setInitialValues] = useState({ caption: '' })
    const db = getFirestore()
    const { userInfo } = useContext(UserContext)

    useEffect(() => {
        setImage(null)
        setInitialValues({ caption: '' })
        let post = {
            caption: "",
            image: ""
        }
    }, [isFocused])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })

        console.log(result)

        if (!result.cancelled) {
            setImage(result.base64!)
        }
    }

    const handleChangeCaption = (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void, e: string) => {
        setFieldValue('caption', e)
    }

    const uploadPost = (caption: string) => {
        if (image !== null && caption !== "") {
            const auth = getAuth()
            let currentUser = auth.currentUser

            if (currentUser) {
                let docRef = collection(db, "users", currentUser?.uid, "posts")

                const data = new FormData()
                data.append('file', "data:image/jpeg;base64," + image)
                data.append('upload_preset', 'webmobilepreset')
                data.append("cloud_name", "ddc13vi37")

                fetch("https://api.cloudinary.com/v1_1/ddc13vi37/upload", {
                    method: "post",
                    body: data
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.secure_url) {

                            addDoc(docRef, {
                                caption: caption,
                                created_at: serverTimestamp(),
                                image: data.url,
                                likes: 10,
                                owner_email: currentUser?.email,
                                owner_uid: currentUser?.uid.toString(),
                                profile_picture: userInfo?.avatar,
                                user: currentUser?.email?.toString().substring(0, currentUser.email.lastIndexOf("@"))
                            })
                                .then(response => navigation.navigate('Accueil', { name: 'Ok' }))
                                .catch(error => console.log(error))
                        }
                    })
                    .catch(err => console.error('Error:', err))
            }
        }
    }

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.container}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => uploadPost(values.caption)}
                        enableReinitialize
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                            <View>
                                <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
                                    <Text style={{ color: colors.text, textAlign: 'center', fontSize: 16 }}>{image === null ? "Ajouter une image" : "Modifier l'image"}</Text>
                                </TouchableOpacity>
                                {image && <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={{ width: 200, height: 200 }} />}
                                <TextInput
                                    onChangeText={(e) => handleChangeCaption(setFieldValue, e)}
                                    onBlur={handleBlur('caption')}
                                    style={[styles.captionInput, { color: colors.text }]}
                                    placeholder={"Ecrire une légende..."}
                                />
                                <TouchableOpacity onPress={handleSubmit} style={styles.shareButton}>
                                    <Text style={{ color: colors.primary, textAlign: 'center' }}>Partager</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    captionInput: {
        marginTop: 20,
        height: 30,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
    },
    pickButton: {
        marginTop: 20,
        marginBottom: 20,
    },
    shareButton: {
        marginTop: 20,
        marginBottom: 20,
    }
})

export default New