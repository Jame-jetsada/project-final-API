import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkdYPS6a6y5QOIwtabzf1LArFuewPZNDQ",
  authDomain: "project-kmutnb-bds.firebaseapp.com",
  projectId: "project-kmutnb-bds",
  storageBucket: "project-kmutnb-bds.appspot.com",
  messagingSenderId: "86062455833",
  appId: "1:86062455833:web:58ccfe01be528bb632de88",
  measurementId: "G-FF3Y6TNYTB"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);
signInAnonymously(auth).catch(function (error) {
  console.log(`Sign in anonymous error = ${error.code} : ${error.message}`);
});

// Initialize Analytics if supported
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  } else {
    console.log("Firebase Analytics is not supported in this environment.");
  }
});

// Export Firestore to be used in other services
export default firestore;
