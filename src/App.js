import React, { useEffect } from "react";
import "./App.css";
import Pages from "./components/pages/Pages";
import { useSelector } from "react-redux";
import { addDataToFirebase } from "./components/firebase/firebase-config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useSelector((state) => state.auth);
  const { library } = useSelector((state) => state.bookStore);
  const { shelf } = useSelector((state) => state.bookShelf);

  //add data to firebase
  useEffect(() => {
    if (user && (library.length !== 0 || Object.keys(shelf).length !== 0))
      addDataToFirebase(user, library, shelf);
  }, [library, user, shelf]);

  return (
    <>
      <Pages />
      <ToastContainer position="top-left" autoClose={2000} limit={3} />
    </>
  );
}

export default App;
