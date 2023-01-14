import { useState } from "react";
import React from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/FireBase";

function LoginScreen() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});
    const [massage, setError] = useState("");


    onAuthStateChanged(auth, (currentUser) => {
        // setError("")
        if (currentUser == null)
            setUser("not connected")
        else
            setUser(currentUser);
    });

    //login
    const login = async () => {
        setError("");
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };

    //logout
    const logout = async () => {
        await signOut(auth);
    };


    return (
        <div className="App">

            <div>
                <h3> Login </h3>
                <input placeholder="Email..." onChange={(event) => { setLoginEmail(event.target.value); }} />
                <input placeholder="Password..." onChange={(event) => { setLoginPassword(event.target.value); }} />
                <button onClick={login}> Login</button>
            </div>

            <h4> User Logged In: </h4>
            {user.email}
            {massage}
            <button onClick={logout}> Sign Out </button>

        </div>
    );
}

export default LoginScreen;