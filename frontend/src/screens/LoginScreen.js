import { useState } from "react";
import React from 'react';
import { createContext } from "react";
import { Link } from "react-router-dom";

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
    const isAdmin = user.email === "admin@gmail.com";
    const adminLink = isAdmin ? <Link to="/admin" className="nav-link">Admin Area</Link> : null;

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
            <br></br>
            {adminLink}
            <button onClick={logout}> Sign Out </button>

        </div>
    );
}

export default LoginScreen;