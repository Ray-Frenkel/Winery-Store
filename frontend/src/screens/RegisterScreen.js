import { useState } from "react";
import React from 'react';

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/FireBase";

function RegisterScreen() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [user, setUser] = useState({});
    const [massage, setError] = useState("");

    onAuthStateChanged(auth, (currentUser) => {
        // setError("")
        if (currentUser == null)
            setUser("not connected")
        else
            setUser(currentUser);
    });

    //create user
    const register = async () => {
        setError("");
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };

    return (
        <div className="App">

            <div>
                <h3> Register User </h3>
                <input placeholder="Email..." onChange={(event) => { setRegisterEmail(event.target.value); }} />
                <input placeholder="Password..." onChange={(event) => { setRegisterPassword(event.target.value); }} />
                <button onClick={register}> Create User</button>
            </div>

        </div>
    );
}

export default RegisterScreen;