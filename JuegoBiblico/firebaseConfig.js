import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de tu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDglpOuIyVB0BYRNgsakoeqCHgi4mB4mMg",
  authDomain: "biblia-d141b.firebaseapp.com",
  projectId: "biblia-d141b",
  storageBucket: "biblia-d141b.appspot.com",
  messagingSenderId: "37245969782",
  appId: "1:37245969782:web:4ea17d69d49fdd211e0657",
  measurementId: "G-PH8J7RTVET"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };