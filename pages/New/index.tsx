import { useTheme } from "@react-navigation/native"
import { Button, StyleSheet, Image, TextInput, View } from "react-native"
import { Formik } from 'formik'
import * as ImagePicker from 'expo-image-picker'
import { useState } from "react"

const New = () => {

    const { colors } = useTheme()
    const [image, setImage] = useState(null)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        //console.log(result)

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    return (
        <Formik
            initialValues={{ caption: '', image: "" }}
            onSubmit={values => console.log(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <Button title="Nouvelle publication" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    <TextInput
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                        style={styles.captionInput}
                    />
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    captionInput: {
        backgroundColor: 'red',
        marginTop: 20
    }
})

export default New