// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw4SRyT-JBdnJdfUhdmSjlX-6RgkJSfaw",
  authDomain: "chat-app-ahmed5.firebaseapp.com",
  databaseURL: "http://chat-app-ahmed5.firebaseio.com",
  projectId: "chat-app-ahmed5",
  storageBucket: "chat-app-ahmed5.appspot.com",
  messagingSenderId: "242206675448",
  appId: "1:242206675448:web:36f850b3892dcd2ed7860d",
  measurementId: "G-DLLE5RXQCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export {auth, db, storage}