// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_ky-88lDYvKxv77pGfLE3C_XdQAHIrE4",
  authDomain: "teslaclone-92782.firebaseapp.com",
  projectId: "teslaclone-92782",
  storageBucket: "teslaclone-92782.appspot.com",
  messagingSenderId: "576160721072",
  appId: "1:576160721072:web:2114831f0774059144b375",
  measurementId: "G-76DR7T58K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const db = getFirestore()

