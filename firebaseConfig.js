// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDs5oIKsGpZbDzJ1ldHdxwaWDtHa5ZtNk",
  authDomain: "journal-app-74aed.firebaseapp.com",
  databaseURL: "https://journal-app-74aed-default-rtdb.firebaseio.com",
  projectId: "journal-app-74aed",
  storageBucket: "journal-app-74aed.firebasestorage.app",
  messagingSenderId: "621749558762",
  appId: "1:621749558762:web:ac9bfca5ee65ed5f5be693",
  measurementId: "G-B2SFJMRR8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { db, storage };