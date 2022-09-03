import React, { useEffect } from "react";
import "./App.css";
import Pages from "./components/pages/Pages";
import { useSelector } from "react-redux";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { addDataToFirebase } from "./components/firebase/firebase-config";

function App() {
  const { user } = useSelector((state) => state.auth);
  const { library } = useSelector((state) => state.bookStore);
  const { shelf } = useSelector((state) => state.bookShelf);

  //add library to firebase
  useEffect(() => {
    if (user && (library.length !== 0 || Object.keys(shelf).length !== 0))
      addDataToFirebase(user, library, shelf);
  }, [library, user, shelf]);

  return (
    <>
      <ReactNotifications isMobile={true} />
      <Pages />
    </>
  );
}

export default App;
