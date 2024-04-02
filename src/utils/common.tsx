import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import dayjs from "dayjs";

export const loadStorage = (key: string, type: "session" | "local") => {
    const data = type === "session" ? sessionStorage.getItem(key) : localStorage.getItem(key);
    return data && JSON.parse(data);
}

export const dispatchStorage = (key: string, data: any, type: "session" | "local") =>
    type === "session" ? sessionStorage.setItem(key, JSON.stringify(data)) : localStorage.setItem(key, JSON.stringify(data));

export const deleteStorage = (key: string, type: "session" | "local") =>
    type === "session" ? sessionStorage.removeItem(key) : localStorage.removeItem(key);


export const getAuthSession = (): Promise<any | null> => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            resolve(user);
            unsubscribe();
        });
    });
};

export const futureEndDateorCPA = (date: string, type: string) => dayjs().isBefore(dayjs(date)) || type === "CPA";

export const pastEndDate = (date: string) => dayjs(date).isBefore(dayjs());

export const contactEmail = () => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=support@brandzbuzz.com");

export const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });