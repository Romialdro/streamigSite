// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnng-A7g8I3TQOKNn6OyY4aJu9zojwL48",
  authDomain: "streamingsite-7f2e9.firebaseapp.com",
  projectId: "streamingsite-7f2e9",
  storageBucket: "streamingsite-7f2e9.appspot.com",
  messagingSenderId: "1098135864128",
  appId: "1:1098135864128:web:4c014b2a75352a50b4f0a5",
  measurementId: "G-7FJKH8ESDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // Asegúrate de inicializar Firestore

export { auth, db, analytics };
