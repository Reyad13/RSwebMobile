import React from "react"
import { useTheme } from "@react-navigation/native"
import { Image, Button, StyleSheet, TextInput, View , Text, ScrollView, } from "react-native"
import { Field, Formik} from 'formik';
import { useState } from "react"
import { collection, getDocs, getFirestore, onSnapshot, query, where, orderBy, startAt, endAt } from "firebase/firestore"
import { UserInfoType } from "../../types";



const Search = () => {

    const [usersInfo, setUsersInfo] = useState<UserInfoType[] | null>(null)
    const { colors } = useTheme()
    const [text, setText] = useState('');



    const ShowUsers = ((value: string) => {
        const db = getFirestore()
        const userScole = query(collection(db, "users"), orderBy('username'), startAt(value), endAt(value+'\uf8ff'))
        getDocs(userScole).then(querySnapshot => {
            var datas = []
            querySnapshot.forEach((doc) => {
                let data = {
                    email: doc.get("email"),
                    username: doc.get("username"),
                    firstName: doc.get("firstName"),
                    lastName: doc.get("lastName"),
                    nbAbonnements: doc.get("nbAbonnements"),
                    nbAbonnes: doc.get("nbAbonnes"),
                    avatar: doc.get("avatar"),
                }
                datas.push(data)
             
              })   
              setUsersInfo(datas)
        } )

    })

    return (
        <>
        <View>
            <Text style={[styles.brand, { color: colors.text }]}>Recherche</Text>
                <TextInput
                style={{ height: 40, borderColor: 'white', borderWidth: 1, color: 'white' }}
                onChangeText={newText => setText(newText)} 
                />
            <Button onPress={() => ShowUsers(text)} title="Recherche" />
        </View>
        <View style={styles.UsersView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ScrollView style={styles.scrollview}>
                    {usersInfo && usersInfo.map( (userInfo, n) => (
                        <><Image source={{ uri: userInfo.avatar.toString() }} style={styles.story} />
                        <Text style={[{ color: "white", marginLeft:5, fontWeight: '700' }]}>{userInfo.username.toString()}</Text></>
                    ) )}
            </ScrollView>
        </View>
        </View>
        </>
    )

    

    
}






const styles = StyleSheet.create({
    brand: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: 'Pacifico_400Regular',
        flex: 0,
        alignItems: 'flex-start',
        width: '100%'
    },
    scrollview: {
        width: '100%',
    },
    UsersView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
    },
    story: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginLeft: 6,
        marginTop: 10,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
})









export default Search

function onChangeText(text: any) {
    throw new Error("Function not implemented.")
}
function value(value: any): void {
    throw new Error("Function not implemented.");
}

