// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdJu13PfJWsS1Np2YbUC4MgrBJLPRx8qs",
  authDomain: "demoprojectlearningpurpose.firebaseapp.com",
  databaseURL: "https://demoprojectlearningpurpose-default-rtdb.firebaseio.com",
  projectId: "demoprojectlearningpurpose",
  storageBucket: "demoprojectlearningpurpose.firebasestorage.app",
  messagingSenderId: "1023275189425",
  appId: "1:1023275189425:web:795c03a8b4f11bc3520e90",
  databaseURL: "https://demoproject01-23fa3-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
