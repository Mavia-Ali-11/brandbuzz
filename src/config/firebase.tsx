import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCta9BCIUvxrHvzpS_ZZ_elJzbWHZ22XDs",
    authDomain: "brandzbuzz-8429e.firebaseapp.com",
    projectId: "brandzbuzz-8429e",
    storageBucket: "brandzbuzz-8429e.appspot.com",
    messagingSenderId: "11228078584",
    appId: "1:11228078584:web:ed6c7edffbb26508cdf60d",
    measurementId: "G-31VV2FPNWR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
    auth,
    getAuth,
    provider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
};