
// import { initializeApp } from "firebase/app";
// import {getAuth, GoogleAuthProvider} from "firebase/auth"
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: "fir-403a4.firebaseapp.com",
//   projectId: "fir-403a4",
//   storageBucket: "fir-403a4.firebasestorage.app",
//   messagingSenderId: "1015876390359",
//   appId: "1:1015876390359:web:8703658bbe55e8df9e8f92",
//   measurementId: "G-6WKJYLGSH8"
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// const provider = new GoogleAuthProvider()

// export {auth , provider}


import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "fir-403a4.firebaseapp.com",
  projectId: "fir-403a4",
  storageBucket: "fir-403a4.firebasestorage.app",
  messagingSenderId: "1015876390359",
  appId: "1:1015876390359:web:8703658bbe55e8df9e8f92",
  measurementId: "G-6WKJYLGSH8"
};

if (!firebaseConfig.apiKey) {
  throw new Error(
    "Firebase API key is missing. Check your .env file."
  );
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
