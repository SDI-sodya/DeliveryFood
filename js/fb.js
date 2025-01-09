import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJuftlo7MjmPWeFQZi5cAum6LH4zYLcAQ",
  authDomain: "deliveryfood-45e47.firebaseapp.com",
  projectId: "deliveryfood-45e47",
  storageBucket: "deliveryfood-45e47.firebasestorage.app",
  messagingSenderId: "789226037089",
  appId: "1:789226037089:web:e038c9abcf8c6b3b7b6f20",
  measurementId: "G-VY7CVQ01K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };