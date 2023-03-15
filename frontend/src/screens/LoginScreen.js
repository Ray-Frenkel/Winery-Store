import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import { useContext } from "react";
import Button from "react-bootstrap/Button";

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
    const [message, setError] = useState("");



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
                <Button onClick={login}> Login</Button>
            </div>


            {user.email ? (
                <div>
                    <p>Welcome back!<br></br> {user.email} {adminLink} <Link to="/history">Your Purchase History</Link></p>
                    <Button onClick={logout}> Sign Out </Button>
                </div>
            ) : null}
            {message}
        </div>
    );
}

export default LoginScreen;