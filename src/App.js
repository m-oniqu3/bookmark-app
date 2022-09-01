import React, { useEffect } from "react";
import "./App.css";
import Pages from "./components/pages/Pages";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/features/auth/authSlice";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { addDataToFirebase } from "./components/firebase/firebase-config";

function App() {
  const dispatch = useDispatch();
  const { user, isSignedIn } = useSelector((state) => state.auth);
  const { library } = useSelector((state) => state.bookStore);
  const { shelf } = useSelector((state) => state.bookShelf);

  // check if user data is stored in localStorage and update the store
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(setUser(user));
  }, [dispatch]);

  //add library to firebase
  useEffect(() => {
    // if both library and shelf are empty, do not add to firebase
    if (isSignedIn && library.length === 0 && Object.keys(shelf).length === 0)
      return;

    if (isSignedIn && (library.length > 0 || Object.keys(shelf).length > 0)) {
      addDataToFirebase(user, library, shelf);
    }
  }, [isSignedIn, library, user, shelf]);

  //if (isSignedIn && loading === true) return <Loading />;

  return (
    <>
      <ReactNotifications isMobile={true} />
      <Pages />
    </>
  );
}

export default App;
