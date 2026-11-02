import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
  getFirestore,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

import {
  getAuth,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDap6hRTze85QsSA5tEYjrZ24Dqwwm-UGI",
    authDomain: "to-do-app-461fb.firebaseapp.com",
    projectId: "to-do-app-461fb",
    storageBucket: "to-do-app-461fb.firebasestorage.app",
    messagingSenderId: "1063180103948",
    appId: "1:1063180103948:web:e9a086daccf95391f39929"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);
