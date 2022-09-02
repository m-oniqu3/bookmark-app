import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signOut } from "firebase/auth";
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
export const provider = new GoogleAuthProvider().setCustomParameters({
  prompt: "select_account",
});

// add data to firebase
export const booksCollection = collection(database, "books");
export const addDataToFirebase = async (id, library, shelf) => {
  const currentDoc = doc(database, "books", `${id}`);
  await setDoc(
    currentDoc,
    { id, library: [...library], shelf: { ...shelf } },
    { merge: true }
  );
};

// sign user out
export const signUserOut = async () => {
  await signOut(auth)
    .then(() => localStorage.removeItem("user"))
    .catch((error) => alert(error));
};
