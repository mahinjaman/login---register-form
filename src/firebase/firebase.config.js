// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7JAX3hUZ8r-cXRGrNtJkQHtY2wWcZizk",
    authDomain: "react-authentication-86460.firebaseapp.com",
    projectId: "react-authentication-86460",
    storageBucket: "react-authentication-86460.appspot.com",
    messagingSenderId: "988336857044",
    appId: "1:988336857044:web:a34fa7985c3d5a08b48041"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;