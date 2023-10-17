// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXjMzUDSst0fPDv-5RJaxRtzbUW2jkDOo",
  authDomain: "expense-tracker-937f0.firebaseapp.com",
  projectId: "expense-tracker-937f0",
  storageBucket: "expense-tracker-937f0.appspot.com",
  messagingSenderId: "660546793290",
  appId: "1:660546793290:web:0d5c0e9ba15819bf519bb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);