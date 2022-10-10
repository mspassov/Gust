// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwClNMIYsmJr6qkb1rvFJF8z0wQt7v4kA",
  authDomain: "gust-ms.firebaseapp.com",
  projectId: "gust-ms",
  storageBucket: "gust-ms.appspot.com",
  messagingSenderId: "806543037999",
  appId: "1:806543037999:web:9d6eeb43f75d771fb458da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

