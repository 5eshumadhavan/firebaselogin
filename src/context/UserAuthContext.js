import { createContext, useContext, useEffect, useState} from "react";
import{
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "firebase/auth";

import { auth } from "../firebase";
const userAuthContext = createContext();

export function UserAuthContextProvider({children}){
    const[user,setUser]=useState("");
    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }
    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }
    function logOut(){
        return signOut(auth);
    }
    function googleSignUp(){
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleAuthProvider)
    }
    function setupRecaptcha(number){
        const recaptchaverifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
        recaptchaverifier.render()
        return signInWithPhoneNumber(auth,number,recaptchaverifier)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        });
        return () =>{
            unsubscribe();
        }
    },[]);
    return <userAuthContext.Provider value={{user,signUp,logIn,logOut,googleSignUp,setupRecaptcha}}>
        {children}
        </userAuthContext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthContext) 
}