import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vibe-5435f.firebaseapp.com",
  projectId: "vibe-5435f",
  storageBucket: "vibe-5435f.firebasestorage.app",
  messagingSenderId: "699282055719",
  appId: "1:699282055719:web:931c6d4484ba5bfb102402",
  measurementId: "G-XE7F5K05B2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };