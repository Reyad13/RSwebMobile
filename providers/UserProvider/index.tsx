import { User, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import useFirebaseLogin from "../../hooks/useFirebaseLogin"
import { UserInfoType } from "../../types"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "../../config/firebase"

interface IUserContext {
    user: User | null,
    userInfo: UserInfoType | null
}

export const UserContext = createContext<IUserContext>({
    user: null,
    userInfo: null
})

export const UserConsumer = UserContext.Consumer

export const useAuth = () => {
    return useContext(UserContext)
}

const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null)
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null)
    const { getAuth } = useFirebaseLogin()
    const db = getFirestore()

    const getDocSnap = async (docRef: any) => {
        return await getDoc(docRef)
    }

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, setUser)
    }, [])

    useEffect(() => {
        if (user) {
            const docRef = doc(db, "users", user.uid.toString())
            getDocSnap(docRef)
                .then(docSnap => {
                    if (docSnap.exists()) {
                        setUserInfo({
                            email: docSnap.get("email"),
                            firstName: docSnap.get("firstName"),
                            lastName: docSnap.get("lastName"),
                            nbAbonnements: docSnap.get("nbAbonnements"),
                            nbAbonnes: docSnap.get("nbAbonnes"),
                        })
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("Le document n'existe pas !");
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, userInfo }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider