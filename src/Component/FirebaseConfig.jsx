import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCLaEpesEPhZSGtKOH9c6UGtfVvsrGgnRI",
    authDomain: "chat-app-f09ae.firebaseapp.com",
    projectId: "chat-app-f09ae",
    storageBucket: "chat-app-f09ae.appspot.com",
    messagingSenderId: "997800704740",
    appId: "1:997800704740:web:089835b39ebad373450af1",
    measurementId: "G-HXHCJH3L3Z"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };