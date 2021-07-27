import React, {useContext, useEffect, useState } from 'react';
import firebase from '../firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({ logginIn: false })
    const auth = new firebase.auth.GoogleAuthProvider();

    function signIn() {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(()=> {
                firebase.auth().signInWithPopup(auth)
                    .then((res) => {
                        firebase.firestore().collection('users').doc(res.user.uid).get()
                            .then((snapshot => {
                                if (!snapshot.exists) {
                                    firebase.firestore().collection('users').doc(res.user.uid).set({
                                        name: res.user.displayName
                                    })
                                }
                            })
                    )})
            })
            .catch(err => console.error(`${err.code}\n ${err.message}`))
    }

    function logout() {
        firebase.auth().signOut()
        .then(() => console.log('logged out successfully'))
        .catch(err => console.error(err))
    }

    useEffect(() => {
        // Firebase knows whether we log in or out. If it detects a change, the user object will be updated by setCurrentUser.
        const subscribe = firebase.auth().onAuthStateChanged(u => {

            if (u) {
                setCurrentUser({
                    id: u.uid,
                    name: u.displayName,
                    image: u.photoURL,
                    email: u.email,
                    loggedIn: true
                });   
            }
            else {
                setCurrentUser({ loggedIn : false });
            }
        })
        return subscribe
    }, [])
    
    // shortcut
    const value = { currentUser, signIn, logout }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}    
