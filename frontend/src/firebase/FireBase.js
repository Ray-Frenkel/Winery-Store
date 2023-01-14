// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDX_ANJcq2XytOM7EcGBEVVM8zuR4Az7XA",
    authDomain: "winerystore-5a063.firebaseapp.com",
    projectId: "winerystore-5a063",
    storageBucket: "winerystore-5a063.appspot.com",
    messagingSenderId: "359110873544",
    appId: "1:359110873544:web:4dc3434cef502536ddb0fd",
    measurementId: "G-YTBCJTFPTC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);