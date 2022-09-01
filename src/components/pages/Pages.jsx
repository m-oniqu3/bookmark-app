import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { updateLibrary } from "../../store/features/library/librarySlice";
import { updateShelf } from "../../store/features/shelf/shelfSlice";
import useGetDataFromFirebase from "../../hooks/useGetDataFromFirebase";
import Loading from "../helpers/loading/Loading";

const Pages = () => {
  const { feedback } = useSelector((state) => state.bookStore);
  const { shelfFeedback } = useSelector((state) => state.bookShelf);
  const { user, isSignedIn } = useSelector((state) => state.auth);
  const [dataForUser, loading] = useGetDataFromFirebase();
  const dispatch = useDispatch();

  //update store
  useEffect(() => {
    if (isSignedIn && !!dataForUser) {
      const { library, shelf } = dataForUser;

      if (!!library) dispatch(updateLibrary(library));
      if (!!shelf) dispatch(updateShelf(shelf));
    }
  }, [dataForUser, dispatch, isSignedIn]);

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
        {user !== null && (
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
        )}
        {user !== null && (
          <Route
            path="/shelves"
            element={
              <ProtectedRoute>
                <Shelves />
              </ProtectedRoute>
            }
          />
        )}
        <Route path="/search/:query" element={<Search />} />
        <Route path="/details/:bookId" element={<BookDetails />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default Pages;
