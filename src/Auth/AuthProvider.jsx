import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const googleProvider = new GoogleAuthProvider()
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    // create user 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // login user 
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // update user 
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    // logout user
    const userSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    // stay user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

            if (currentUser?.email) {

                // get token and store client
                const userInfo = { email: currentUser.email }
            axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        console.log(res.data?.token)
                        if (res.data?.token) {
                            localStorage.setItem('access-token',res.data?.token)
                         return   setLoading(false)
                        }
                    })
            } else {
             return   localStorage.removeItem('access-token')
            }
            setUser(currentUser)
           return setLoading(false);
        })
        return () => {
            unSubscribe()
        }
    }, [axiosPublic])
    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        userSignOut,
        googleLogin,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;