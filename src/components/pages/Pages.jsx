import React, { useEffect, useState } from "react";
import Navbar from "../nav/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";
import Search from "./Search";
import Explore from "./Explore";
import Shelves from "./Shelves";
import NoMatch from "../helpers/routes/NoMatch";
import BookDetails from "../books/BookDetails";
import ProtectedRoute from "../helpers/routes/ProtectedRoute";
import Notification from "../helpers/notification/Notification";
import { Store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";

import { updateLibrary } from "../../store/features/library/librarySlice";
import { updateShelf } from "../../store/features/shelf/shelfSlice";
import Loading from "../helpers/loading/Loading";
import { booksCollection } from "../firebase/firebase-config";
import { onSnapshot, query, where } from "firebase/firestore";

const Pages = () => {
  const { feedback } = useSelector((state) => state.bookStore);
  const { shelfFeedback } = useSelector((state) => state.bookShelf);
  const { user, isSignedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [dataForUser, setDataForUser] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // query to find data for the current user
    const request = query(booksCollection, where("id", "==", `${user}`));
    const unsub = onSnapshot(request, (snapshot) => {
      setDataForUser(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  //update store
  useEffect(() => {
    const valid = dataForUser?.length !== 0 && dataForUser !== undefined;
    if (user && valid) {
      const { library, shelf } = dataForUser[0];

      // if library/shelf is not empty, update the store
      if (library?.length !== 0) dispatch(updateLibrary(library));
      if (Object.keys(shelf).length !== 0) dispatch(updateShelf(shelf));
    }
  }, [dataForUser, dispatch, user]);

  //add library to firebase
  // useEffect(() => {
  //   if (isSignedIn && library.length > 0) {
  //     console.log("library sending");
  //     addLibraryToFirebase(user, library);
  //   }
  // }, [isSignedIn, library, user]);

  // //add shelf to firebase
  // useEffect(() => {
  //   if (isSignedIn && Object.keys(shelf).length > 0) {
  //     console.log("shelf sending");
  //     addShelfToFirebase(user, shelf);
  //   }
  // }, [isSignedIn, user, shelf]);

  // show notifications when feedback is received
  useEffect(() => {
    if (feedback.message !== "") {
      Store.addNotification({
        content: (
          <Notification
            type={feedback.type}
            message={feedback.message}
            title={feedback.title}
          />
        ),

        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],

        dismiss: {
          duration: 1200,
          pauseOnHover: true,
        },
      });
    }
  }, [feedback]);

  useEffect(() => {
    if (shelfFeedback.message !== "") {
      Store.addNotification({
        content: (
          <Notification
            type={shelfFeedback.type}
            message={shelfFeedback.message}
            title={shelfFeedback.title}
          />
        ),

        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],

        dismiss: {
          duration: 1200,
          pauseOnHover: true,
        },
      });
    }
  }, [shelfFeedback]);
  return (
    <>
      <Navbar />
      {isSignedIn && loading && <Loading />}
      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shelves"
          element={
            <ProtectedRoute>
              <Shelves />
            </ProtectedRoute>
          }
        />

        <Route path="/search/:query" element={<Search />} />
        <Route path="/details/:bookId" element={<BookDetails />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default Pages;
