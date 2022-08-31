import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

// firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

// initialize firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// library
export const libraryCollection = collection(database, "books");

// add library to firebase
export const addDataToFirebase = async (id, library, shelf) => {
  const currentDoc = doc(database, "books", `${id}`);
  await setDoc(
    currentDoc,
    { userData: { library: [...library], shelf: { ...shelf } } },
    { merge: true }
  );
};
