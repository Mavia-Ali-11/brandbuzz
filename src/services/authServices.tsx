import axios from "axios";
import { FIND_USER, SAVE_USER } from "../config/endpoints";
import {
    auth,
    provider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    getAuth, 
    signOut
} from "../config/firebase";

// Firebase auth services
export const authUserWithGoogle = async () => {
    const response = await signInWithPopup(auth, provider);
    return response && response.user;
}

export const registerUser = async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response && response.user;
}

export const loginUser = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response && response.user;
}

export const logoutUser = async () => {
   const response = await signOut(getAuth());
   return response;
}

// Local auth services
export const saveUser = async (data: {}) => {
    const response = await axios.post(SAVE_USER, data);
    return response && response.data;
}

export const findUser = async (email: string) => {
    const response = await axios.post(FIND_USER, { email });
    return response && response.data;
}
