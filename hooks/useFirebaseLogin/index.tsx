import {
    getAuth,
    onAuthStateChanged,
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import { useState } from "react"

const useFirebaseLogin = () => {
    const [user, setUser] = useState<User | null>(null);

    const checkAuth = (): Promise<void> =>
        new Promise((resolve) => {
            const auth = getAuth();
            onAuthStateChanged(auth, (u) => {
                setUser(u)
                resolve()
            })
        })

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

    const registerUser = (fistName: string, lastName: string, email: string, password: string) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('User account created & signed in!');
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

    return {
        user,
        checkAuth,
        connectEmailPassword,
        logout,
        registerUser,
        loginUser,
    };
};

export default useFirebaseLogin;