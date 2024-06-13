import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRfDVWbT5yEsANyAOVFQBVPJ_LLg5b-_U",
    authDomain: "syncnote-5f6b3.firebaseapp.com",
    projectId: "syncnote-5f6b3",
    storageBucket: "syncnote-5f6b3.appspot.com",
    messagingSenderId: "471351285769",
    appId: "1:471351285769:web:c19934bd946dfb70e700d8",
    measurementId: "G-9S5XT7P827"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
