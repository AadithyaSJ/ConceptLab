// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider  } from "firebase/auth"; // optional if using auth
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX7i7L0XofQNiXQ3Wu_2tKwL_mE__3gDY",
  authDomain: "conceptlab-intern.firebaseapp.com",
  projectId: "conceptlab-intern",
  storageBucket: "conceptlab-intern.firebasestorage.app",
  messagingSenderId: "246352474706",
  appId: "1:246352474706:web:1c5071f5073b37ca7ae58b",
  measurementId: "G-CK3JCCLLME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services you'll use
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;