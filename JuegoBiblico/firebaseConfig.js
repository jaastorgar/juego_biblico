// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDglpOuIyVB0BYRNgsakoeqCHgi4mB4mMg",
  authDomain: "biblia-d141b.firebaseapp.com",
  projectId: "biblia-d141b",
  storageBucket: "biblia-d141b.appspot.com",
  messagingSenderId: "37245969782",
  appId: "1:37245969782:web:4ea17d69d49fdd211e0657",
  measurementId: "G-PH8J7RTVET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);