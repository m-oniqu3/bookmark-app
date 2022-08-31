import React, { useEffect } from "react";
import "./App.css";
import Pages from "./components/pages/Pages";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/features/auth/authSlice";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { addDataToFirebase } from "./components/firebase/firebase-config";
import useGetDataFromFirebase from "./hooks/useGetDataFromFirebase";
import { updateLibrary } from "./store/features/library/librarySlice";
import { updateShelf } from "./store/features/shelf/shelfSlice";
import Loading from "./components/helpers/loading/Loading";

function App() {
  const dispatch = useDispatch();
  const { user, isSignedIn } = useSelector((state) => state.auth);
  const { library } = useSelector((state) => state.bookStore);
  const { shelf } = useSelector((state) => state.bookShelf);
  const [dataForUser, loading] = useGetDataFromFirebase();

  // check if user data is stored in localStorage and update the store
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(setUser(user));
  }, [dispatch]);

  //add library to firebase
  useEffect(() => {
    if (isSignedIn && (library.length > 0 || Object.keys(shelf).length > 0)) {
      addDataToFirebase(user, library, shelf);
    }
  }, [isSignedIn, library, user, shelf]);

  //update store
  useEffect(() => {
    if (isSignedIn && !!dataForUser) {
      const { library, shelf } = dataForUser;

      if (!!library) dispatch(updateLibrary(library));
      if (!!shelf) dispatch(updateShelf(shelf));
    }
  }, [dataForUser, dispatch, isSignedIn]);

  if (isSignedIn && loading === true) return <Loading />;

  return (
    <>
      <ReactNotifications isMobile={true} />
      <Pages />
    </>
  );
}

export default App;
