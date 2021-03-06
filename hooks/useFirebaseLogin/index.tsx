import {
    getAuth,
    onAuthStateChanged,
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore"
import { useState } from "react"

interface ProfilePicture {
    profile_picture: string
}

const useFirebaseLogin = () => {
    const [user, setUser] = useState<User | null>(null)
    const [profile_picture, setprofile_picture] = useState<ProfilePicture | null>(null)

    const checkAuth = (): Promise<void> =>
        new Promise((resolve) => {
            const auth = getAuth();
            onAuthStateChanged(auth, (u) => {
                setUser(u)
                const db = getFirestore()
                if (u) {
                    const docRef = doc(db, "users", u.uid.toString())
                    getDocSnap(docRef)
                        .then(docSnap => {
                            if (docSnap.exists()) {
                                setprofile_picture(docSnap.get("avatar"))
                            } else {
                                console.log("Le document n'existe pas !")
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
                resolve()
            })
        })



    const getDocSnap = async (docRef: any) => {
        return await getDoc(docRef)
    }

    const connectEmailPassword = (email: string, password: string) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                console.log(value)
            })
            // if user dosn't exist create new user
            .catch(() => {
                createUserWithEmailAndPassword(auth, email, password).then((value) => {
                    console.log(value)
                })
            })
    }

    const loginUser = (email: string, password: string) => {
        const auth = getAuth()
        return signInWithEmailAndPassword(auth, email, password)
        /*.then((value) => {
            console.log(value)
        })
        .catch(error => {
            console.log(error)
        })*/
    }

    const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
        const auth = getAuth()
        const db = getFirestore()

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                try {
                    await setDoc(doc(db, "users", response.user.uid), {
                        email: email,
                        username: email.substring(0, email.lastIndexOf("@")),
                        lastName: lastName,
                        firstName: firstName,
                        nbAbonnements: 0,
                        nbAbonnes: 0
                    })
                } catch (e) {
                    console.log("Erreur sur l'ajout du document", e)
                }
                console.log('User account created & signed in!')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
            })
    }

    const logout = () => {
        const auth = getAuth()
        signOut(auth)
    }

    const currentUser = () => {
        const auth = getAuth()
        return auth.currentUser
    }

    return {
        user,
        checkAuth,
        connectEmailPassword,
        logout,
        registerUser,
        loginUser,
        getAuth,
        currentUser,
        profile_picture,
    };
};

export default useFirebaseLogin;